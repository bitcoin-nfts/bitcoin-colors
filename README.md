# Bitcoin Colors

Welcome to the Bitcoin NFTs proof of concept - Bitcoin Colors!

This repo contains the contracts, tests, and a sample chainhook implementation.

The chainhook will monitor a BTC address and after receiving a transaction, perform a corresponding mint on Stacks.

🚧 WIP 🚧

## Trait Generation Algorithm

Each trait in the [generation/trait_specification.json](./generation/trait_specification.json) file consists of a name, and all the keys with that name represent the values + weight.

```json
{
  "trait_type": "Q1 Background",
  "value": "Orange",
  "weight": 0.13
},
```

The address is hashed via SHA-1 then the string is split based on the number of traits.

```python
def hash_address(self, addr):
  H = hashlib.sha1(bytes(addr, 'UTF-8'))
  return H.digest()
```

Each string is then converted into an array of probabilities, which then determines the resulting traits for the address.

## Configuration Overview

This repository consists of the following components:

- `./chainhooks` yaml files that define what actions to watch for on the Bitcoin/Stacks chain
  - e.g. `wrap-btc.chainhook.yaml` monitors for an output to the authority address
- `./contracts` Clarity contracts also defined in Clarinet.toml within the root directory
- `./deployments` the default deployment plan for devnet, and yaml definitions of specific actions to take
  - e.g. `wrap-btc.devnet-plan.yaml` will wrap BTC into cBTC by sending a Bitcoin TX to the authority address, firing the chainhook
- `./serverless` the HTTP event listener that responds to the actions defined in `./chainhooks`
  - e.g. `module.exports.wrapBtc` will receive the matching event and perform a follow-up action to mint cBTC

## Running Locally

Docker and Clarinet are required to run `clarinet integrate`.

- [Docker Engine](https://docs.docker.com/engine/install/)
- [Clarinet](https://github.com/hirosystems/clarinet)

### Setup Clarinet Integrate

From the project directory run `clarinet integrate` to spawn a local devnet which includes a Bitcoin node, Stacks node, Stacks API, Stacks Explorer and Bitcoin Explorer.

The terminal window will show the container status, current chain state, and log events.

### Setup HTTP Event Listener

In a new terminal window, navigate to the project directory, then the `./serverless` subfolder and configure the packages.

```
cd serverless
yarn global add serverless
yarn
```

Test that the serverless command is available, if not, close and reopen the terminal window and try again. The output should be similar to:

```
$ which serverless
/home/USER/.yarn/bin/serverless
```

Once confirmed, from the `./serverless` subfolder run:

```
serverless offline --verbose --printOutput
```

The terminal window will show the event listener and log information if any of the API routes are used, e.g. `POST /api/v1/wrapBtc`.

### Test out Deployments

In a new terminal window, navigate to the project directory, then run one of the following commands to perform a pre-defined action:

```
clarinet deployment apply --deployment-plan-path=deployments/wrap-btc.devnet-plan.yaml
```

```
clarinet deployment apply --deployment-plan-path=deployments/unwrap-btc.devnet-plan.yaml
```

This will submit a transaction to devnet for either wrapping or unwrapping cBTC, and the results can be seen in both the clarinet integrate terminal window as well as the HTTP event listener.
