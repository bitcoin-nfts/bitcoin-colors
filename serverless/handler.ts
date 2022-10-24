import * as dotenv from "dotenv";
import {
  BitcoinChainEvent,
  StacksChainEvent,
  StacksTransactionEventType,
  StacksFTBurnEventData,
} from "@hirosystems/chainhook-types";
import {
  getNonce,
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  addressFromHashMode,
  AddressHashMode,
  TransactionVersion,
  standardPrincipalCVFromAddress,
  uintCV,
  addressToString,
} from "@stacks/transactions";
import { StacksTestnet } from "@stacks/network";
import { principalCV } from "@stacks/transactions/dist/clarity/types/principalCV";
import Script from "bitcore-lib/lib/script";
import Opcode from "bitcore-lib/lib/opcode";
import Networks from "bitcore-lib/lib/networks";
import Transaction from "bitcore-lib/lib/transaction";
import PrivateKey from "bitcore-lib/lib/privatekey";
import Signature from "bitcore-lib/lib/crypto/signature";
import { Output, Input } from "bitcore-lib/lib/transaction";

dotenv.config();

interface HttpEvent {
  routeKey: string;
  body: string;
  authorization: string;
}

const cbtcAuthority = {
  stxAddress: "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5",
  btcAddress: "mr1iPkD9N3RJZZxXRk7xF9d36gffa6exNC",
};

const cbtcToken = {
  contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractName: "cbtc-token",
  assetName: "cbtc",
};

const BITCOIN_NODE_URL = "http://localhost:18443";
const STACKS_NODE_URL = "http://localhost:20443";

module.exports.wrapBtc = async (event: HttpEvent) => {
  let chainEvent: BitcoinChainEvent = JSON.parse(event.body);

  // taking a closer look
  const debugTx = chainEvent.apply[0].transaction;
  for (const input of debugTx.metadata.inputs) {
    console.log("input", input);
  }
  for (const output of debugTx.metadata.outputs) {
    console.log("output", output);
  }
  const debugBlockId = chainEvent.apply[0].block_identifier;
  const debugConfirmations = chainEvent.apply[0].confirmations;
  const debugProof = chainEvent.apply[0].proof;
  console.log("debugTx", debugTx);
  console.log("debugBlockId", debugBlockId);
  console.log("debugConfirmations", debugConfirmations);
  console.log("debugProof", debugProof);

  // In this protocol, we're assuming that BTC transactions include 2 outputs:
  // - 1 funding the authority address
  // - 1 getting the change. p2pkh is being expected on this 2nd output
  // that we're using for inferring the Stacks address to fund.
  let satsAmount = chainEvent.apply[0].transaction.metadata.outputs[0].value;
  let recipientPubkey =
    chainEvent.apply[0].transaction.metadata.outputs[1].script_pubkey;

  // Build Stack address
  let script = Script.fromBuffer(Buffer.from(recipientPubkey, "hex"));
  let hashBytes = script.getPublicKeyHash().toString("hex");
  let recipientAddress = addressFromHashMode(
    AddressHashMode.SerializeP2PKH,
    TransactionVersion.Testnet,
    hashBytes
  );

  if (addressToString(recipientAddress) === cbtcAuthority.stxAddress) {
    // Avoid minting when authority is unwrapping cBTC and keeping the change
    return {
      statusCode: 301,
    };
  }

  // Build a Stacks transaction
  const network = new StacksTestnet({ url: STACKS_NODE_URL });
  const nonce = await getNonce(cbtcAuthority.stxAddress, network);
  const txOptions = {
    contractAddress: cbtcToken.contractAddress,
    contractName: cbtcToken.contractName,
    functionName: "mint",
    functionArgs: [
      uintCV(satsAmount),
      standardPrincipalCVFromAddress(recipientAddress),
    ],
    fee: 1000,
    nonce,
    network,
    anchorMode: AnchorMode.OnChainOnly,
    postConditionMode: PostConditionMode.Allow,
    senderKey: process.env.AUTHORITY_SECRET_KEY!,
  };
  const tx = await makeContractCall(txOptions);

  // Broadcast transaction to our Devnet stacks node
  const result = await broadcastTransaction(tx, network);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        result: result,
      },
      null,
      2
    ),
  };
};

module.exports.unwrapBtc = async (event: HttpEvent) => {
  let chainEvent: StacksChainEvent = JSON.parse(event.body);
  let assetId = `${cbtcToken.contractAddress}.${cbtcToken.contractName}::${cbtcToken.assetName}`;
  let transfer = undefined as any;

  let receipt = chainEvent.apply[0].transaction.metadata.receipt;
  for (let txEvent of receipt.events) {
    if (txEvent.type === StacksTransactionEventType.StacksFTBurnEvent) {
      let burnEvent = txEvent.data as StacksFTBurnEventData;
      if (burnEvent.asset_identifier == assetId) {
        transfer = { recipient: burnEvent.sender, amount: burnEvent.amount };
        break;
      }
    }
  }

  if (transfer === undefined) {
    return {
      message: "Event not found",
      statusCode: 404,
    };
  }
  let response = await fetch(BITCOIN_NODE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("devnet:devnet"),
    },
    body: JSON.stringify({
      id: 0,
      method: `listunspent`,
      params: [1, 9999999, [cbtcAuthority.btcAddress]],
    }),
  });
  let json = await response.json();
  let unspentOutputs = json.result;

  let recipientAddress = principalCV(transfer.recipient);
  let authorityAddress = principalCV(cbtcAuthority.stxAddress);

  let typicalSize = 600;
  let txFee = 10 * typicalSize;
  let totalRequired = parseInt(transfer.amount) + txFee;
  let selectedUtxosIndices: number[] = [];
  let cumulatedAmount = 0;
  let i = 0;
  for (let utxo of unspentOutputs) {
    cumulatedAmount += utxo.amount * 100_000_000;
    selectedUtxosIndices.push(i);
    if (cumulatedAmount >= totalRequired) {
      break;
    }
    i++;
  }
  if (cumulatedAmount < totalRequired) {
    return {
      message: "Funding unsufficient",
      unspentOutputs: unspentOutputs,
      statusCode: 404,
    };
  }

  selectedUtxosIndices.reverse();
  let transaction = new Transaction();
  transaction.setVersion(1);
  let selectedUnspentOutput: any[] = [];
  for (let index of selectedUtxosIndices) {
    let unspentOutput = unspentOutputs[index];

    unspentOutputs.splice(index, 1);
    let input = Input.fromObject({
      prevTxId: unspentOutput.txid,
      script: Script.empty(),
      outputIndex: unspentOutput.vout,
      output: new Output({
        satoshis: parseInt(transfer.amount),
        script: Buffer.from(unspentOutput.scriptPubKey, "hex"),
      }),
    });
    transaction.addInput(new Input.PublicKeyHash(input));
    selectedUnspentOutput.push(unspentOutput);
  }

  let unwrapOutput = new Output({
    satoshis: parseInt(transfer.amount),
    script: new Script()
      .add(Opcode.map.OP_DUP)
      .add(Opcode.map.OP_HASH160)
      .add(Buffer.from(recipientAddress.address.hash160, "hex"))
      .add(Opcode.map.OP_EQUALVERIFY)
      .add(Opcode.map.OP_CHECKSIG),
  });

  transaction.outputs.push(unwrapOutput);

  let changeOutput = new Output({
    satoshis: cumulatedAmount - parseInt(transfer.amount) - txFee,
    script: new Script()
      .add(Opcode.map.OP_DUP)
      .add(Opcode.map.OP_HASH160)
      .add(Buffer.from(authorityAddress.address.hash160, "hex"))
      .add(Opcode.map.OP_EQUALVERIFY)
      .add(Opcode.map.OP_CHECKSIG),
  });

  transaction.outputs.push(changeOutput);

  let secretKey = new PrivateKey(
    process.env.AUTHORITY_SECRET_KEY!.slice(0, 64),
    Networks.testnet
  );

  transaction.sign(secretKey, Signature.SIGHASH_ALL, "ecdsa");
  let tx = transaction.serialize(true);

  response = await fetch(BITCOIN_NODE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("devnet:devnet"),
    },
    body: JSON.stringify({
      id: 0,
      method: `sendrawtransaction`,
      params: [tx],
    }),
  });
  json = await response.json();
  let txid = json.result;

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        txid,
      },
      null,
      2
    ),
  };
};
