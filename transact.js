const nem2Sdk = require("nem2-sdk");
const node = 'http://52.194.207.217:3000';

function checkvalidity(hashstring)
{
    const request = require('request');
    var url = node + '/transaction/' + hashstring + '/status';
    request(url, function (error, response, body) {
        const user = JSON.parse(body);
        if ( (response && response.statusCode) == 200 || user["status"] == "Success") {
            console.log("Transaction Success!");
        }
        else{
            console.log("Transaction failed");
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

for (var i = 2; i < process.argv.length; i++) {
    privateKey += process.argv[i];
}

/* start block 01 */
const mosaicId = "77a1969932d987d7";     						        //your mosaic mosaicId
const address = "SC7APJ3C6BWK3DWVMNUJRQXETYMIC6Y2OG557QHU";		//the person's address you want to send to

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    Address.createFromRawAddress(address),
    [new Mosaic(new MosaicId(mosaicId), UInt64.fromUint(1))],
    PlainMessage.create('enjoy your ticket!'),
    NetworkType.MIJIN_TEST
);

/* end block 01 */

/* start block 02 get the meta generation hash at http://52.194.207.217:3000/block/1 */
const networkGenerationHash = "9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7"; 
const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
const signedTransaction = account.sign(transferTransaction, networkGenerationHash);
/* end block 02 */

/* start block 03 */
const transactionHttp = new TransactionHttp(node);    //your node, both sender and receiver have to be on the same node

transactionHttp.announce(signedTransaction);
/* end block 03 */

setTimeout(function(){checkvalidity(signedTransaction.hash.toString())},1000);


