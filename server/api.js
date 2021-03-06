"use strict";
const express = require('express');
const router = express.Router();

const Web3 = require('web3');

const managerABI = [{"constant":false,"inputs":[],"name":"attach","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getImage","outputs":[{"name":"res","type":"bytes1[500]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"head","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"img","type":"bytes1[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
const nodeABI = [{"constant":false,"inputs":[{"name":"res","type":"bytes1[]"}],"name":"setImage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_next","type":"address"}],"name":"setNext","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"image","outputs":[{"name":"","type":"bytes1"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"attachToHead","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getNext","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getImage","outputs":[{"name":"res","type":"bytes1[500]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"res","type":"bytes1[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

var  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const defaultAccount = "0x9a2dc5d88eb632081a0e4835768afaaebd094432";

web3.eth.getBlock(0, function(error, result){
   if(!error){
       console.log("in:");
       console.log(result);
    }
   else
       console.error(error);
})

router.post('/api/getImage', (req, res) => {
    var index = req.body.seq;
    var address = req.body.photoAddress;
    var manager = new web3.eth.Contract(managerABI,address);

    // get
    manager.methods.getImage(index).call(
        function(error, result){
            if(!error){
                var data = Buffer.alloc(500);
                for(var c1=0;c1<data.length;c1++){
                    data[c1] = web3.utils.hexToNumber(result[c1]);
                }
                res.send({sign: true, data: data.toString("base64")});
            }
            else{
                res.send({sign: false});
                console.error(error);
            }
    });
});

router.post('/api/uploadImage', (req, res) => {
    var data = Buffer.from(req.body.data,'base64');
    var photoAddress = req.body.photoAddress;

    var imgdata = [];
    for(var c1=0;c1<data.length;c1++){
        imgdata[c1] = web3.utils.toHex(data[c1]);
    }

    var node =new web3.eth.Contract(nodeABI);
    web3.eth.estimateGas(node);
    node.deploy({
        from : defaultAccount,
        data: '0x6060604052341561000f57600080fd5b60405161068a38038061068a833981016040528080518201919050506100478161004d64010000000002610283176401000000009004565b506100d5565b60008090505b81518110156100d157818181518110151561006a57fe5b906020019060200201516000826101f48110151561008457fe5b602091828204019190066101000a81548160ff02191690837f0100000000000000000000000000000000000000000000000000000000000000900402179055508080600101915050610053565b5050565b6105a6806100e46000396000f300606060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633f34a72b1461007d578063b2b2b44d146100d7578063c79178c614610110578063f28dee271461018b578063f3638f78146101dc578063f3651cbb14610231575b600080fd5b341561008857600080fd5b6100d5600480803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050610283565b005b34156100e257600080fd5b61010e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061030b565b005b341561011b57600080fd5b610131600480803590602001909190505061034f565b60405180827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561019657600080fd5b6101c2600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610398565b604051808215151515815260200191505060405180910390f35b34156101e757600080fd5b6101ef610453565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561023c57600080fd5b61024461047d565b60405180826101f460200280838360005b83811015610270578082015181840152602081019050610255565b5050505090500191505060405180910390f35b60008090505b81518110156103075781818151811015156102a057fe5b906020019060200201516000826101f4811015156102ba57fe5b602091828204019190066101000a81548160ff02191690837f0100000000000000000000000000000000000000000000000000000000000000900402179055508080600101915050610289565b5050565b80601060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000816101f48110151561035f57fe5b60209182820401919006915054906101000a90047f01000000000000000000000000000000000000000000000000000000000000000281565b60008060405180807f61747461636828290000000000000000000000000000000000000000000000008152506008019050604051809103902090508273ffffffffffffffffffffffffffffffffffffffff16817c010000000000000000000000000000000000000000000000000000000090046040518163ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004016000604051808303816000875af192505050915050919050565b6000601060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61048561052e565b60006101f48060200260405190810160405280929190826101f48015610524576020028201916000905b82829054906101000a90047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190600101906020826000010492830192600103820291508084116104af5790505b5050505050905090565b613e80604051908101604052806101f4905b60007effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019060019003908161054057905050905600a165627a7a72305820efda46bfcdc2cd6e66f2bd6d0bb8dcd60bee44946a98456baab193a44ab1ba5d0029',
        arguments:[imgdata],
    }).send({
        from : defaultAccount,
        gas: '3141590'
    }, function(error, transactionHash){
        console.log(transactionHash);
    })
    .on('error', function(error){  })
    .on('transactionHash', function(transactionHash){  })
    .on('receipt', function(receipt){
        console.log(receipt.contractAddress) // contains the new contract address
    })
    .on('confirmation', function(confirmationNumber, receipt){  })
    .then(function(newContractInstance){
        newContractInstance.methods.attachToHead(photoAddress)
            .send({
                from : defaultAccount,
                gas: '3700000'
            }, function(error, transactionHash){
                console.log(transactionHash);
            })
            .on('error', function(error){  })
            .on('transactionHash', function(transactionHash){  })
            .on('receipt', function(receipt){
                // console.log(receipt.contractAddress) // contains the new contract address
            })
            .on('confirmation', function(confirmationNumber, receipt){  })
            .then(function(newContractInstance){
                console.log("over");
                // console.log(newContractInstance) // instance with the new contract address
            });
    });

    res.send({sign: false, msg: 'ssss'});
});

module.exports = router;
