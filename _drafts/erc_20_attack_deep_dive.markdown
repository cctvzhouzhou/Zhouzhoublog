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

### The Bad transcation inpsection

https://etherscan.io/tx/0x0213fb70e8174c5cbd9233a8e95905462cd7f1b498c12ff5e8ec071f4cc99347

```
Function: transfer(address _to, uint256 _value)

0xa9059cbb0000000000000000000000000797350000000000000000000000000000000000000000000005150ac4c39a6f3f0000`
```

```
0: 0xa0795bd02ad852e44b9626
1: 0x
2: 0x5150ac4c39a6f3f00000000000000000000000000000000000000
3: 0x797350000000000000000000000000000000000
4: 0x40d
5: 0xa9059cbb
```

```json
{
    "action": {
      "callType": "call",
      "from": "0x0536806df512d6cdde913cf95c9886f65b1d3462",
      "gas": "0x108fc",
      "input": "0xa9059cbb0000000000000000000000000797350000000000000000000000000000000000000000000005150ac4c39a6f3f0000",
      "to": "0xa74476443119a942de498590fe1f2454d7d4ac0d",
      "value": "0x0"
    },
    "blockHash": "0xda2d6c1f1b8dee27976b90b7bbbc6a00c9f883382816a4db8895703d9ff4e9ee",
    "blockNumber": 3375451,
    "result": {
      "gasUsed": "0x4d2",
      "output": "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    "subtraces": 0,
    "traceAddress": [],
    "transactionHash": "0x0213fb70e8174c5cbd9233a8e95905462cd7f1b498c12ff5e8ec071f4cc99347",
    "transactionPosition": 0,
    "type": "call"
  }
]

```

```
> web3.fromWei(web3.toBigNumber("0x5150ac4c39a6f3f00000000000000000000000000000000000000"),"ether")
2.09069399123938660191650712182178886585904267264e+45
```

### A working example

https://etherscan.io/tx/0xe9350ea88820f286416761b4fa2af3c2b340dcbba9b3cfafb3d1f9d5ba4162b7


```
Function: transfer(address _to, uint256 _value)

MethodID: 0xa9059cbb
[0]:000000000000000000000000ce192be11dde37630ef842e3af5fbd7bea15c6f9
[1]:00000000000000000000000000000000000000000000032d26ada7a59b9f0000
```

```json
 {
    "action": {
      "callType": "call",
      "from": "0x0536806df512d6cdde913cf95c9886f65b1d3462",
      "gas": "0x10478",
      "input": "0xa9059cbb000000000000000000000000ce192be11dde37630ef842e3af5fbd7bea15c6f900000000000000000000000000000000000000000000032d26ada7a59b9f0000",
      "to": "0xa74476443119a942de498590fe1f2454d7d4ac0d",
      "value": "0x0"
    },
    "blockHash": "0xda2d6c1f1b8dee27976b90b7bbbc6a00c9f883382816a4db8895703d9ff4e9ee",
    "blockNumber": 3375451,
    "result": {
      "gasUsed": "0x34d8",
      "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
    },
    "subtraces": 0,
    "traceAddress": [],
    "transactionHash": "0xe9350ea88820f286416761b4fa2af3c2b340dcbba9b3cfafb3d1f9d5ba4162b7",
    "transactionPosition": 9,
    "type": "call"
  }
]
```
 
```
0: 0xa0795bd02ad852e44b9626
1: 0x
2: 0x32d26ada7a59b9f0000
3: 0xce192be11dde37630ef842e3af5fbd7bea15c6f9
4: 0x40d
5: 0xa9059cbb
```

```javascript
> web3.fromWei(web3.toBigNumber("0x32d26ada7a59b9f0000"),"ether")
14999.99
```

### Explain

```javascript
> web3.fromWei(web3.toBigNumber("0x5150ac4c39a6f3f0000"),"ether")
> 23999.99
>
```


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

#### a fix example by by redditor izqui9 


https://www.reddit.com/r/ethereum/comments/63s917/worrysome_bug_exploit_with_erc20_token/dfwmhc3/

https://kovan.etherscan.io/tx/0xe1be0e021f2e40af16ab64bc2268e55c50d152d06eeed433230f0693e0800ef2
https://kovan.etherscan.io/tx/0xf323c15975e1fb47d9bd226401f259725319d737cdec343d254fdb6f9d5c84c0
https://kovan.etherscan.io/address/0xbc6570f77ef0db0edef56013e2b2f5d822c883f4#code

```javascript
contract NonPayloadAttackableToken {
   modifier onlyPayloadSize(uint size) {
     assert(msg.data.length == size + 4);
     _;
   } 

  function transfer(address _to, uint256 _value) onlyPayloadSize(2 * 32) {
    // do stuff
  }   
}
```

