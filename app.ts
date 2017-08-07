const sigt = require('bitcoin');
const config = require('./config');
import generatedApi from './lib/bittrex-api-generator'

const client = new sigt.Client(config);

//console.log(generatedApi.account.getBalance({currency:'ETH'}));
const txid = async function pollBalance(_currency){
    var response = generatedApi.account.getBalance({currency:_currency})
        .then(function(res){
            if (res["success"] == "true")
                return res["CryptoAddress"];
            else
                console.log('Not Found');
        }
    );
    await sleep(2000);

}



function transfer(address, amount){
    console.log(address);
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function transferFunds(options){
    var address = options.address;
    var amount = options.amount;

    const balance = client.getBalance('*', 0, function(err, balance){
        if (err) return console.log(err);
        if (amount !== undefined && amount > balance) amount = balance - 0.0001;
        console.log('Balance: ' + balance);
    })
    /*client.sendToAddress(address, amount, function(err, txid){
        if (err) return console.log(err);
        console.log(txid);
    })*/
}
 
//transfer(txid('ETH'),10);