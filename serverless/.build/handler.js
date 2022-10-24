"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var chainhook_types_1 = require("@hirosystems/chainhook-types");
var transactions_1 = require("@stacks/transactions");
var network_1 = require("@stacks/network");
var principalCV_1 = require("@stacks/transactions/dist/clarity/types/principalCV");
var script_1 = require("bitcore-lib/lib/script");
var opcode_1 = require("bitcore-lib/lib/opcode");
var networks_1 = require("bitcore-lib/lib/networks");
var transaction_1 = require("bitcore-lib/lib/transaction");
var privatekey_1 = require("bitcore-lib/lib/privatekey");
var signature_1 = require("bitcore-lib/lib/crypto/signature");
var transaction_2 = require("bitcore-lib/lib/transaction");
dotenv.config();
var cbtcAuthority = {
    stxAddress: "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5",
    btcAddress: "mr1iPkD9N3RJZZxXRk7xF9d36gffa6exNC",
};
var cbtcToken = {
    contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractName: "cbtc-token",
    assetName: "cbtc",
};
var BITCOIN_NODE_URL = "http://localhost:18443";
var STACKS_NODE_URL = "http://localhost:20443";
module.exports.wrapBtc = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var chainEvent, debugTx, _i, _a, input, _b, _c, output, debugBlockId, debugConfirmations, debugProof, satsAmount, recipientPubkey, script, hashBytes, recipientAddress, network, nonce, txOptions, tx, result;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                chainEvent = JSON.parse(event.body);
                debugTx = chainEvent.apply[0].transaction;
                for (_i = 0, _a = debugTx.metadata.inputs; _i < _a.length; _i++) {
                    input = _a[_i];
                    console.log("input", input);
                }
                for (_b = 0, _c = debugTx.metadata.outputs; _b < _c.length; _b++) {
                    output = _c[_b];
                    console.log("output", output);
                }
                debugBlockId = chainEvent.apply[0].block_identifier;
                debugConfirmations = chainEvent.apply[0].confirmations;
                debugProof = chainEvent.apply[0].proof;
                console.log("debugTx", debugTx);
                console.log("debugBlockId", debugBlockId);
                console.log("debugConfirmations", debugConfirmations);
                console.log("debugProof", debugProof);
                satsAmount = chainEvent.apply[0].transaction.metadata.outputs[0].value;
                recipientPubkey = chainEvent.apply[0].transaction.metadata.outputs[1].script_pubkey;
                script = script_1.default.fromBuffer(Buffer.from(recipientPubkey, "hex"));
                hashBytes = script.getPublicKeyHash().toString("hex");
                recipientAddress = (0, transactions_1.addressFromHashMode)(transactions_1.AddressHashMode.SerializeP2PKH, transactions_1.TransactionVersion.Testnet, hashBytes);
                if ((0, transactions_1.addressToString)(recipientAddress) === cbtcAuthority.stxAddress) {
                    // Avoid minting when authority is unwrapping cBTC and keeping the change
                    return [2 /*return*/, {
                            statusCode: 301,
                        }];
                }
                network = new network_1.StacksTestnet({ url: STACKS_NODE_URL });
                return [4 /*yield*/, (0, transactions_1.getNonce)(cbtcAuthority.stxAddress, network)];
            case 1:
                nonce = _d.sent();
                txOptions = {
                    contractAddress: cbtcToken.contractAddress,
                    contractName: cbtcToken.contractName,
                    functionName: "mint",
                    functionArgs: [
                        (0, transactions_1.uintCV)(satsAmount),
                        (0, transactions_1.standardPrincipalCVFromAddress)(recipientAddress),
                    ],
                    fee: 1000,
                    nonce: nonce,
                    network: network,
                    anchorMode: transactions_1.AnchorMode.OnChainOnly,
                    postConditionMode: transactions_1.PostConditionMode.Allow,
                    senderKey: process.env.AUTHORITY_SECRET_KEY,
                };
                return [4 /*yield*/, (0, transactions_1.makeContractCall)(txOptions)];
            case 2:
                tx = _d.sent();
                return [4 /*yield*/, (0, transactions_1.broadcastTransaction)(tx, network)];
            case 3:
                result = _d.sent();
                return [2 /*return*/, {
                        statusCode: 200,
                        body: JSON.stringify({
                            result: result,
                        }, null, 2),
                    }];
        }
    });
}); };
module.exports.unwrapBtc = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var chainEvent, assetId, transfer, receipt, _i, _a, txEvent, burnEvent, response, json, unspentOutputs, recipientAddress, authorityAddress, typicalSize, txFee, totalRequired, selectedUtxosIndices, cumulatedAmount, i, _b, unspentOutputs_1, utxo, transaction, selectedUnspentOutput, _c, selectedUtxosIndices_1, index, unspentOutput, input, unwrapOutput, changeOutput, secretKey, tx, txid;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                chainEvent = JSON.parse(event.body);
                assetId = "".concat(cbtcToken.contractAddress, ".").concat(cbtcToken.contractName, "::").concat(cbtcToken.assetName);
                transfer = undefined;
                receipt = chainEvent.apply[0].transaction.metadata.receipt;
                for (_i = 0, _a = receipt.events; _i < _a.length; _i++) {
                    txEvent = _a[_i];
                    if (txEvent.type === chainhook_types_1.StacksTransactionEventType.StacksFTBurnEvent) {
                        burnEvent = txEvent.data;
                        if (burnEvent.asset_identifier == assetId) {
                            transfer = { recipient: burnEvent.sender, amount: burnEvent.amount };
                            break;
                        }
                    }
                }
                if (transfer === undefined) {
                    return [2 /*return*/, {
                            message: "Event not found",
                            statusCode: 404,
                        }];
                }
                return [4 /*yield*/, fetch(BITCOIN_NODE_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Basic " + btoa("devnet:devnet"),
                        },
                        body: JSON.stringify({
                            id: 0,
                            method: "listunspent",
                            params: [1, 9999999, [cbtcAuthority.btcAddress]],
                        }),
                    })];
            case 1:
                response = _d.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                json = _d.sent();
                unspentOutputs = json.result;
                recipientAddress = (0, principalCV_1.principalCV)(transfer.recipient);
                authorityAddress = (0, principalCV_1.principalCV)(cbtcAuthority.stxAddress);
                typicalSize = 600;
                txFee = 10 * typicalSize;
                totalRequired = parseInt(transfer.amount) + txFee;
                selectedUtxosIndices = [];
                cumulatedAmount = 0;
                i = 0;
                for (_b = 0, unspentOutputs_1 = unspentOutputs; _b < unspentOutputs_1.length; _b++) {
                    utxo = unspentOutputs_1[_b];
                    cumulatedAmount += utxo.amount * 100000000;
                    selectedUtxosIndices.push(i);
                    if (cumulatedAmount >= totalRequired) {
                        break;
                    }
                    i++;
                }
                if (cumulatedAmount < totalRequired) {
                    return [2 /*return*/, {
                            message: "Funding unsufficient",
                            unspentOutputs: unspentOutputs,
                            statusCode: 404,
                        }];
                }
                selectedUtxosIndices.reverse();
                transaction = new transaction_1.default();
                transaction.setVersion(1);
                selectedUnspentOutput = [];
                for (_c = 0, selectedUtxosIndices_1 = selectedUtxosIndices; _c < selectedUtxosIndices_1.length; _c++) {
                    index = selectedUtxosIndices_1[_c];
                    unspentOutput = unspentOutputs[index];
                    unspentOutputs.splice(index, 1);
                    input = transaction_2.Input.fromObject({
                        prevTxId: unspentOutput.txid,
                        script: script_1.default.empty(),
                        outputIndex: unspentOutput.vout,
                        output: new transaction_2.Output({
                            satoshis: parseInt(transfer.amount),
                            script: Buffer.from(unspentOutput.scriptPubKey, "hex"),
                        }),
                    });
                    transaction.addInput(new transaction_2.Input.PublicKeyHash(input));
                    selectedUnspentOutput.push(unspentOutput);
                }
                unwrapOutput = new transaction_2.Output({
                    satoshis: parseInt(transfer.amount),
                    script: new script_1.default()
                        .add(opcode_1.default.map.OP_DUP)
                        .add(opcode_1.default.map.OP_HASH160)
                        .add(Buffer.from(recipientAddress.address.hash160, "hex"))
                        .add(opcode_1.default.map.OP_EQUALVERIFY)
                        .add(opcode_1.default.map.OP_CHECKSIG),
                });
                transaction.outputs.push(unwrapOutput);
                changeOutput = new transaction_2.Output({
                    satoshis: cumulatedAmount - parseInt(transfer.amount) - txFee,
                    script: new script_1.default()
                        .add(opcode_1.default.map.OP_DUP)
                        .add(opcode_1.default.map.OP_HASH160)
                        .add(Buffer.from(authorityAddress.address.hash160, "hex"))
                        .add(opcode_1.default.map.OP_EQUALVERIFY)
                        .add(opcode_1.default.map.OP_CHECKSIG),
                });
                transaction.outputs.push(changeOutput);
                secretKey = new privatekey_1.default(process.env.AUTHORITY_SECRET_KEY.slice(0, 64), networks_1.default.testnet);
                transaction.sign(secretKey, signature_1.default.SIGHASH_ALL, "ecdsa");
                tx = transaction.serialize(true);
                return [4 /*yield*/, fetch(BITCOIN_NODE_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Basic " + btoa("devnet:devnet"),
                        },
                        body: JSON.stringify({
                            id: 0,
                            method: "sendrawtransaction",
                            params: [tx],
                        }),
                    })];
            case 3:
                response = _d.sent();
                return [4 /*yield*/, response.json()];
            case 4:
                json = _d.sent();
                txid = json.result;
                return [2 /*return*/, {
                        statusCode: 200,
                        body: JSON.stringify({
                            txid: txid,
                        }, null, 2),
                    }];
        }
    });
}); };
//# sourceMappingURL=handler.js.map