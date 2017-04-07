---

layout: post
title: ERC 20 Attack Deep Dive
date: 2017-04-07 
comments: true
external-url:
categories: blockchain 
tag: blockchain 

---

> Read those blogs first to know the background
>

> From cpp-ethereum developer and Golem team member Paweł Bylica (https://github.com/chfast) 

[How to Find $10M Just by Reading the Blockchain](https://blog.golemproject.net/how-to-find-10m-by-just-reading-blockchain-6ae9d39fcd95)

> From Peter Vessenes (http://vessenes.com/about/)

[The ERC20 Short Address Attack Explained](http://vessenes.com/the-erc20-short-address-attack-explained/)


## Reference:

### ERCs

https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
https://github.com/ethereum/EIPs/issues/20   (ERC 20)
https://github.com/ethereum/EIPs/issues/179  (ERC Simpler Token standard)
https://github.com/ethereum/EIPs/issues/223  (ERC 23)

### Token Impls:

https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/token/StandardToken.sol
https://github.com/ConsenSys/Tokens/blob/master/Token_Contracts/contracts/StandardToken.sol
https://github.com/Dexaran/ERC23-tokens/blob/master/ERC23_token.sol

### TOOLS:
http://www.statman.info/conversions/hexadecimal.php


[1]:https://etherscan.io/address/0xa74476443119a942de498590fe1f2454d7d4ac0d                      (golem's contract addr)
[2]:https://etherscan.io/txs?block=3375451                                                       (the block the bad tx inside)
[3]:https://etherscan.io/tx/0x0213fb70e8174c5cbd9233a8e95905462cd7f1b498c12ff5e8ec071f4cc99347   (The bad tx)
[4]:https://etherscan.io/address/0xa74476443119a942de498590fe1f2454d7d4ac0d#code                 (golem's contract code)
[5]:https://etherscan.io/tx/0xe9350ea88820f286416761b4fa2af3c2b340dcbba9b3cfafb3d1f9d5ba4162b7   (A good tx example )
[6]:https://etherscan.io/txs?a=0x0536806df512d6cdde913cf95c9886f65b1d3462&p=152                  (The trans at that time)
[7]:https://etherscan.io/token/GOLEM#balances                                                    (Current golem balances)
[8]:https://etherscan.io/token/Golem?a=0x289df52c16058f597bb10bc4bcf2e780552ea2d3                (the golem's token big tx-es, 69,999.99 )
[9]:https://etherscan.io/address/0x289df52c16058f597bb10bc4bcf2e780552ea2d3                      (the golem's holder address)
[10]:https://github.com/golemfactory/golem-crowdfunding/blob/50bf8af3ac359401d46b4047df096020e19ba9dd/contracts/Token.sol#L81  (golem crowdfunding contract source code on github)

## ERC 20 Attack Deep Dive 

The 


#### the ABI for the `transfer` method

The Golem's contract ABI for the `transfer` method, from [the golem's contract address][1] 

```json
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    }
```


