---

layout: post
title: ERC 20 Attack Deep Dive
date: 2017-04-07 
comments: true
external-url:
categories: blockchain 
tag: blockchain 

---

> The entire Ethereum token economy and startup ecosystem might be set back by years. -- Paweł Bylica 


## Background  

Read those blogs first to know the background

From cpp-ethereum developer and Golem team member Paweł Bylica (https://github.com/chfast) 

* [How to Find $10M Just by Reading the Blockchain](https://blog.golemproject.net/how-to-find-10m-by-just-reading-blockchain-6ae9d39fcd95)

From Peter Vessenes (http://vessenes.com/about/)

* [The ERC20 Short Address Attack Explained](http://vessenes.com/the-erc20-short-address-attack-explained/)

### ERCs

* [Ethereum ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)
* [ERC 20](https://github.com/ethereum/EIPs/issues/20)
* [ERC 179 Simpler Token standard](https://github.com/ethereum/EIPs/issues/179)
* [ERC 23](https://github.com/ethereum/EIPs/issues/223)

### Token Impls:

* [First Blood](https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol)
* [OpenZepplin](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/token/StandardToken.sol)
* [ConsenSys](https://github.com/ConsenSys/Tokens/blob/master/Token_Contracts/contracts/StandardToken.sol)
* [ERC23 RI](https://github.com/Dexaran/ERC23-tokens/blob/master/ERC23_token.sol)



[1]:https://etherscan.io/address/0xa74476443119a942de498590fe1f2454d7d4ac0d                      (golem's contract addr)
[2]:https://etherscan.io/txs?block=3375451                                                       (the block the bad tx inside)
[3]:https://etherscan.io/tx/0x0213fb70e8174c5cbd9233a8e95905462cd7f1b498c12ff5e8ec071f4cc99347   (The bad tx)
[4]:https://etherscan.io/address/0xa74476443119a942de498590fe1f2454d7d4ac0d#code                 (golem's contract code)
[5]:https://etherscan.io/tx/0xe9350ea88820f286416761b4fa2af3c2b340dcbba9b3cfafb3d1f9d5ba4162b7   (A good tx example )
[6]:https://etherscan.io/txs?a=0x0536806df512d6cdde913cf95c9886f65b1d3462&p=152                  (The trans at that time)
[7]:https://etherscan.io/token/GOLEM#balances                                                    (Current golem balances)
[8]:https://etherscan.io/token/Golem?a=0x289df52c16058f597bb10bc4bcf2e780552ea2d3                (the golem's token big tx-es, 69,999.99 )
[9]:https://etherscan.io/address/0x289df52c16058f597bb10bc4bcf2e780552ea2d3                      (the golem's holder address)
[10]:https://github.com/golemfactory/golem-crowdfunding/blob/master/contracts/Token.sol#L81 (golem crowdfunding contract source code on github)
[11]:https://www.reddit.com/r/ethereum/comments/63s917/worrysome_bug_exploit_with_erc20_token/dfwmhc3/
[12]:https://kovan.etherscan.io/tx/0xe1be0e021f2e40af16ab64bc2268e55c50d152d06eeed433230f0693e0800ef2
[13]:https://kovan.etherscan.io/tx/0xf323c15975e1fb47d9bd226401f259725319d737cdec343d254fdb6f9d5c84c0
[14]: https://kovan.etherscan.io/address/0xbc6570f77ef0db0edef56013e2b2f5d822c883f4#code


## ERC 20 Attack Deep Dive 

begin with a working example 

### A working example

https://etherscan.io/tx/0xe9350ea88820f286416761b4fa2af3c2b340dcbba9b3cfafb3d1f9d5ba4162b7

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

```
the tx will transfer `14,999.99` Golem TOKEN From address `0x0536806df512d6cdde913cf95c9886f65b1d3462` to address `0xce192be11dde37630ef842e3af5fbd7bea15c6f9`

The input data is `0xa9059cbb000000000000000000000000ce192be11dde37630ef842e3af5fbd7bea15c6f900000000000000000000000000000000000000000000032d26ada7a59b9f0000`

```
Function: transfer(address _to, uint256 _value)

MethodID: 0xa9059cbb
[0]:000000000000000000000000ce192be11dde37630ef842e3af5fbd7bea15c6f9
[1]:00000000000000000000000000000000000000000000032d26ada7a59b9f0000
```
1. method id   ,  4 bytes ( 32bits) : the first four bytes of the keccak(sha3) hash of function sigaature 
`0xa9059cbb`

2. arg1 address, 32 bytes (256bits) : leading 12 bytes (92 bits) zero + 20 bytes (160 bits) address
`000000000000000000000000ce192be11dde37630ef842e3af5fbd7bea15c6f9`

3. arg2 value  , 32 bytes (256bits) : uint
`00000000000000000000000000000000000000000000032d26ada7a59b9f0000`

the total input data is `4+32+32 = 68 bytes`

```javascript

> web3.sha3("transfer(address,uint256)").slice(0,10)
"0xa9059cbb"

> web3.fromWei(web3.toBigNumber("0x32d26ada7a59b9f0000"),"ether")
14999.99

```
### The Bad transcation inspection 

Now let's look the problem tx.

https://etherscan.io/tx/0x0213fb70e8174c5cbd9233a8e95905462cd7f1b498c12ff5e8ec071f4cc99347

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
Function: transfer(address _to, uint256 _value)

0xa9059cbb0000000000000000000000000797350000000000000000000000000000000000000000000005150ac4c39a6f3f0000
```

1. `0xa9059cbb` 4bytes(32bits) method id 
2. `0000000000000000000000000797350000000000000000000000000000000000`  32bytes address 
3. `000000000005150ac4c39a6f3f0000`                                    15bytes values (missing 17bytes here)


NOTE: here the total input data is `4+32+15=51bytes`

But, when executed, the data will be seen like, notice the value will be timed 2^17 by shift left 34 nibles 

```
 method : 0xa9059cbb
address : 0x797350000000000000000000000000000000000
  value : 0x5150ac4c39a6f3f00000000000000000000000000000000000000
```

the `0x5150ac4c39a6f3f00000000000000000000000000000000000000` result a very large value

```
> web3.fromWei(web3.toBigNumber("0x5150ac4c39a6f3f00000000000000000000000000000000000000"),"ether")
2.09069399123938660191650712182178886585904267264e+45
```
the value is much higher than the balance of the address, then the tx is failed.

### Explain

The exchange code did't check the user input to verify the address to allow user input a wrong address `79735`, user might try to transfer
`23999.99` token from exchange's account `0x0536806df512d6cdde913cf95c9886f65b1d3462`

```javascript
> web3.fromWei(web3.toBigNumber("0x5150ac4c39a6f3f0000"),"ether")
> 23999.99
>
```
But the real attempt is try to transfer `2.09069399123938660191650712182178886585904267264e+45` token to the wrong address `79735`. The contract tx is executed and failed.

It's very lucky for the user to input such an wrong address as short as `79735`, if user input a longer address, which may result the value not higher than account balance, the user might transfer all token on the account to a wrong address. the money will dismiss forever because no one knows the private key of the random address by wrongly inputed.

Now, let's deep dive why ethereum works like this 

### How ethereum works with contract call 

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

golem crowdfunding [contract source code][10] on github

```javascript
...
   mapping (address => uint256) balances;
...
   event Transfer(address indexed _from, address indexed _to, uint256 _value);
...

   function transfer(address _to, uint256 _value) returns (bool) {
        // Abort if not in Operational state.
        if (funding) throw;

        var senderBalance = balances[msg.sender];
        if (senderBalance >= _value && _value > 0) {
            senderBalance -= _value;
            balances[msg.sender] = senderBalance;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        }
        return false;
    }
```

### Mock the attack

the mockTransferContract.sol 

```javascript
pragma solidity ^0.4.0;
contract PayloadAttackableToken {
    
    mapping (address => uint256) balances;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    function transfer(address _to, uint256 _value) returns (bool){
        var senderBalance = balances[msg.sender];
        if (senderBalance >= _value && _value > 0) {
            senderBalance -= _value;
            balances[msg.sender] = senderBalance;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        }
        return false;
    }
}
```
Go to http://ethereum.github.io/browser-solidity

byteCodde

```
6060604052341561000c57fe5b5b6102298061001c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063a9059cbb1461003b575bfe5b341561004357fe5b610078600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610092565b604051808215151515815260200191505060405180910390f35b60006000600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508281101580156100e85750600083115b156101f157828103905080600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555082600060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a3600191506101f6565b600091505b50929150505600a165627a7a723058202abc12d5494fe89ba003dd3bfcd8260a331eda83c66a32760f482ef9972b49d20029
```

ABI:

```json
[   {
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
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }]
```

Web3 Deploy

```javascript
var ballot_sol_payloadattackabletokenContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}]);
var ballot_sol_payloadattackabletoken = ballot_sol_payloadattackabletokenContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '0x6060604052341561000c57fe5b5b6102298061001c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063a9059cbb1461003b575bfe5b341561004357fe5b610078600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610092565b604051808215151515815260200191505060405180910390f35b60006000600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508281101580156100e85750600083115b156101f157828103905080600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555082600060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a3600191506101f6565b600091505b50929150505600a165627a7a723058202abc12d5494fe89ba003dd3bfcd8260a331eda83c66a32760f482ef9972b49d20029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
```
### How ethereum call the contract

https://github.com/ethereum/go-ethereum/blob/master/core/vm/contracts.go#L68

```go
func (c *ecrecover) Run(in []byte) []byte {
    const ecRecoverInputLength = 128

    in = common.RightPadBytes(in, ecRecoverInputLength)
    // "in" is (hash, v, r, s), each 32 bytes
    // but for ecrecover we want (r, s, v)

    r := new(big.Int).SetBytes(in[64:96])
    s := new(big.Int).SetBytes(in[96:128])
    v := in[63] - 27

    // tighter sig s values in homestead only apply to tx sigs
    if !allZero(in[32:63]) || !crypto.ValidateSignatureValues(v, r, s, false) {
        log.Trace("ECRECOVER error: v, r or s value invalid")
        return nil
    }
    // v needs to be at the end for libsecp256k1
    pubKey, err := crypto.Ecrecover(in[:32], append(in[64:128], v))
    // make sure the public key is a valid one
    if err != nil {
        log.Trace("ECRECOVER failed", "err", err)
        return nil
    }

    // the first byte of pubkey is bitcoin heritage
    return common.LeftPadBytes(crypto.Keccak256(pubKey[1:])[12:], 32)
}
```

### How to fix the issue

* at the contract level (solidity level)
* at the ethereum level (EVM level)

#### a contract fix example by by redditor izqui9 

the [orginal post][11] from reddit user izqui9, which assert the input data size must be same with the `defined size + method id size (4 bytes)`
in this case, it will check if `msg.data.length == 68`.

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

