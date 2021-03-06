import api from "./lib/bittrex-api/bittrex-api-generator";
import Poll from "./lib/actions/polling"
import Notify from "./lib/actions/notify"

//1. get deposit address (loop)
//2. RPC - send coin to adress
//3. get deposit history (loop until confirmed)
//4. get balance for coin
//5. sell at params

let poller = new Poll();
let notifier = new Notify();
//console.log(JSON.stringify(poller));

poller.DepositAddress("DNT").then(result => {
	console.log(JSON.stringify(result, undefined, 2));
	
	notifier.notify("DNT has hit bittrex");
});