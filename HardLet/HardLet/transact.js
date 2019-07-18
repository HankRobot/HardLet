const nem2Sdk = require("nem2-sdk");

function checkvalidity(hashstring)
{
    var request=require('request');
    var url = 'http://40.90.163.184:3000/transaction/' + hashstring + '/status';
    request.get(url,null,function(err,res,body){
        const user = JSON.parse(body);
        if (res.statusCode==200 && user['status']=='Success') {
            console.info("Success!");
        }
        else{
            console.info("Transaction Failed");
        }
    });
}

const Account = nem2Sdk.Account,
    Address = nem2Sdk.Address,
    Deadline = nem2Sdk.Deadline,
    Mosaic = nem2Sdk.Mosaic,
    MosaicId = nem2Sdk.MosaicId,
    NetworkType = nem2Sdk.NetworkType,
    PlainMessage = nem2Sdk.PlainMessage,
    TransactionHttp = nem2Sdk.TransactionHttp,
    TransferTransaction = nem2Sdk.TransferTransaction,
    UInt64 = nem2Sdk.UInt64;

//Retrieve shell 
var privateKey = "";
var mosaicId = "";
var mosaicamount = 0;
var address = "";

privateKey = process.argv[2];
mosaicId = process.argv[3];
mosaicamount = parseInt(process.argv[4]);
address = process.argv[5];

console.log("Your private key is:");
console.log(privateKey);
console.log(mosaicId);
console.log(address);

/* start block 01 */
mosaicId = "77a1969932d987d7";     						//your mosaic mosaicId
//const address = "SADR23O6XLZXVHUKI4BLBFXY2Z7BPRZEUW5ESAQ6";		//the person's address you want to send to

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    Address.createFromRawAddress(address),
    [new Mosaic(new MosaicId(mosaicId), UInt64.fromUint(mosaicamount))],
    PlainMessage.create('enjoy your ticket!'),
    NetworkType.MIJIN_TEST
);
/* end block 01 */

/* start block 02 */
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;
const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
const signedTransaction = account.sign(transferTransaction, networkGenerationHash);
const debug = false;
if(debug){
    console.debug("Hash:");
    console.debug(networkGenerationHash);
    console.debug("Transaction");
    console.debug(transferTransaction);
    console.debug(signedTransaction);
}

/* end block 02 */

/* start block 03 */
const transactionHttp = new TransactionHttp('http://40.90.163.184:3000');    //your node, both sender and receiver have to be on the same node

transactionHttp.announce(signedTransaction);
/* end block 03 */

setTimeout(function(){checkvalidity(signedTransaction.hash.toString())},500);


