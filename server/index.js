
const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


//web3.eth.getBlock(0, function(error, result){
//    if(!error)
//        console.log(result)
//    else
//        console.error(error);
//})


 var abi = [{"constant":false,"inputs":[],"name":"attach","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getImage","outputs":[{"name":"res","type":"bytes1[500]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"head","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"img","type":"bytes1[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
 var address = "0x66dfe89c9b0fa37fc3d1ef782b8439b12ff585c3"
 var manager = new web3.eth.Contract(abi,address);



// console.log(manager)

// get
// manager.methods.getImage(0).call({from: "0x04d3a7a27cd78e6c4ad669bc5ea090916425a328"}, function(error, result){
//     if(!error)
//         console.log(result)
//     else
//         console.error(error);
// });


// set 

fs.readFile('22.jpg', function(err, originBuffer) {
    console.log(Buffer.isBuffer(originBuffer));
    
    // cover
    base64Img = originBuffer.toString('base64');  // base64图片编码字符串
 
    console.log(base64Img);
    
    var res = [web3.utils.toHex(base64Img)] ;
    var nodeABI = [{"constant":false,"inputs":[{"name":"res","type":"bytes1[]"}],"name":"setImage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_next","type":"address"}],"name":"setNext","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"image","outputs":[{"name":"","type":"bytes1"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"attachToHead","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getNext","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getImage","outputs":[{"name":"res","type":"bytes1[500]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"res","type":"bytes1[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
    var node =new web3.eth.Contract(nodeABI);
    node.deploy({
        data: '0x6060604052341561000f57600080fd5b60405161068a38038061068a833981016040528080518201919050506100478161004d64010000000002610283176401000000009004565b506100d5565b60008090505b81518110156100d157818181518110151561006a57fe5b906020019060200201516000826101f48110151561008457fe5b602091828204019190066101000a81548160ff02191690837f0100000000000000000000000000000000000000000000000000000000000000900402179055508080600101915050610053565b5050565b6105a6806100e46000396000f300606060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633f34a72b1461007d578063b2b2b44d146100d7578063c79178c614610110578063f28dee271461018b578063f3638f78146101dc578063f3651cbb14610231575b600080fd5b341561008857600080fd5b6100d5600480803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050610283565b005b34156100e257600080fd5b61010e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061030b565b005b341561011b57600080fd5b610131600480803590602001909190505061034f565b60405180827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561019657600080fd5b6101c2600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610398565b604051808215151515815260200191505060405180910390f35b34156101e757600080fd5b6101ef610453565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561023c57600080fd5b61024461047d565b60405180826101f460200280838360005b83811015610270578082015181840152602081019050610255565b5050505090500191505060405180910390f35b60008090505b81518110156103075781818151811015156102a057fe5b906020019060200201516000826101f4811015156102ba57fe5b602091828204019190066101000a81548160ff02191690837f0100000000000000000000000000000000000000000000000000000000000000900402179055508080600101915050610289565b5050565b80601060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000816101f48110151561035f57fe5b60209182820401919006915054906101000a90047f01000000000000000000000000000000000000000000000000000000000000000281565b60008060405180807f61747461636828290000000000000000000000000000000000000000000000008152506008019050604051809103902090508273ffffffffffffffffffffffffffffffffffffffff16817c010000000000000000000000000000000000000000000000000000000090046040518163ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004016000604051808303816000875af192505050915050919050565b6000601060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61048561052e565b60006101f48060200260405190810160405280929190826101f48015610524576020028201916000905b82829054906101000a90047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190600101906020826000010492830192600103820291508084116104af5790505b5050505050905090565b613e80604051908101604052806101f4905b60007effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019060019003908161054057905050905600a165627a7a7230582038b9aae1248f3290a5fb9ced10b76177f21b74a9f53cb94b1252ee9fb60bb8230029', 
        arguments:[res],
    }).send({
        from: '0x04d3a7a27cd78e6c4ad669bc5ea090916425a328', 
        data: '0x6060604052341561000f57600080fd5b60405161068a38038061068a833981016040528080518201919050506100478161004d64010000000002610283176401000000009004565b506100d5565b60008090505b81518110156100d157818181518110151561006a57fe5b906020019060200201516000826101f48110151561008457fe5b602091828204019190066101000a81548160ff02191690837f0100000000000000000000000000000000000000000000000000000000000000900402179055508080600101915050610053565b5050565b6105a6806100e46000396000f300606060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633f34a72b1461007d578063b2b2b44d146100d7578063c79178c614610110578063f28dee271461018b578063f3638f78146101dc578063f3651cbb14610231575b600080fd5b341561008857600080fd5b6100d5600480803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050610283565b005b34156100e257600080fd5b61010e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061030b565b005b341561011b57600080fd5b610131600480803590602001909190505061034f565b60405180827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561019657600080fd5b6101c2600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610398565b604051808215151515815260200191505060405180910390f35b34156101e757600080fd5b6101ef610453565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561023c57600080fd5b61024461047d565b60405180826101f460200280838360005b83811015610270578082015181840152602081019050610255565b5050505090500191505060405180910390f35b60008090505b81518110156103075781818151811015156102a057fe5b906020019060200201516000826101f4811015156102ba57fe5b602091828204019190066101000a81548160ff02191690837f0100000000000000000000000000000000000000000000000000000000000000900402179055508080600101915050610289565b5050565b80601060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000816101f48110151561035f57fe5b60209182820401919006915054906101000a90047f01000000000000000000000000000000000000000000000000000000000000000281565b60008060405180807f61747461636828290000000000000000000000000000000000000000000000008152506008019050604051809103902090508273ffffffffffffffffffffffffffffffffffffffff16817c010000000000000000000000000000000000000000000000000000000090046040518163ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004016000604051808303816000875af192505050915050919050565b6000601060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61048561052e565b60006101f48060200260405190810160405280929190826101f48015610524576020028201916000905b82829054906101000a90047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190600101906020826000010492830192600103820291508084116104af5790505b5050505050905090565b613e80604051908101604052806101f4905b60007effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019060019003908161054057905050905600a165627a7a7230582038b9aae1248f3290a5fb9ced10b76177f21b74a9f53cb94b1252ee9fb60bb8230029', 
        gas: '1700000'
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
        console.log(newContractInstance.options.address) // instance with the new contract address

        console.log(newContractInstance.methods);
        newContractInstance.methods.attachToHead("0x66dfe89c9b0fa37fc3d1ef782b8439b12ff585c3")
            .send({
                from: '0x04d3a7a27cd78e6c4ad669bc5ea090916425a328', 
                data: '0x6060604052341561000f57600080fd5b60405161068a38038061068a833981016040528080518201919050506100478161004d64010000000002610283176401000000009004565b506100d5565b60008090505b81518110156100d157818181518110151561006a57fe5b906020019060200201516000826101f48110151561008457fe5b602091828204019190066101000a81548160ff02191690837f0100000000000000000000000000000000000000000000000000000000000000900402179055508080600101915050610053565b5050565b6105a6806100e46000396000f300606060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633f34a72b1461007d578063b2b2b44d146100d7578063c79178c614610110578063f28dee271461018b578063f3638f78146101dc578063f3651cbb14610231575b600080fd5b341561008857600080fd5b6100d5600480803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050610283565b005b34156100e257600080fd5b61010e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061030b565b005b341561011b57600080fd5b610131600480803590602001909190505061034f565b60405180827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561019657600080fd5b6101c2600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610398565b604051808215151515815260200191505060405180910390f35b34156101e757600080fd5b6101ef610453565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561023c57600080fd5b61024461047d565b60405180826101f460200280838360005b83811015610270578082015181840152602081019050610255565b5050505090500191505060405180910390f35b60008090505b81518110156103075781818151811015156102a057fe5b906020019060200201516000826101f4811015156102ba57fe5b602091828204019190066101000a81548160ff02191690837f0100000000000000000000000000000000000000000000000000000000000000900402179055508080600101915050610289565b5050565b80601060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000816101f48110151561035f57fe5b60209182820401919006915054906101000a90047f01000000000000000000000000000000000000000000000000000000000000000281565b60008060405180807f61747461636828290000000000000000000000000000000000000000000000008152506008019050604051809103902090508273ffffffffffffffffffffffffffffffffffffffff16817c010000000000000000000000000000000000000000000000000000000090046040518163ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004016000604051808303816000875af192505050915050919050565b6000601060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61048561052e565b60006101f48060200260405190810160405280929190826101f48015610524576020028201916000905b82829054906101000a90047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190600101906020826000010492830192600103820291508084116104af5790505b5050505050905090565b613e80604051908101604052806101f4905b60007effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019060019003908161054057905050905600a165627a7a7230582038b9aae1248f3290a5fb9ced10b76177f21b74a9f53cb94b1252ee9fb60bb8230029', 
                gas: '1700000'
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
                console.log("over");
                console.log(newContractInstance) // instance with the new contract address
            });
    });

});






fs.readFile('22.jpg', function(err, originBuffer) {
    console.log(Buffer.isBuffer(originBuffer));
 
    // 生成图片2(把buffer写入到图片文件)
    fs.writeFile('avatar2.jpg', originBuffer, function(err) {
        if(err) {console.log(err)}
    });
    
    // cover
    base64Img = originBuffer.toString('base64');  // base64图片编码字符串
 
    console.log(base64Img);
 	
    // recover
    var decodeImg = new Buffer(base64Img, 'base64');  // new Buffer(string, encoding)
 
    console.log(Buffer.compare(originBuffer, decodeImg));  // 0 表示一样
 
    // 生成图片3(把base64位图片编码写入到图片文件)
    fs.writeFile('avatar3.jpg', decodeImg, function(err) {
        if(err) {console.log(err)}
    });
});





