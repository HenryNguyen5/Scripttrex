import api from './lib/bittrex-api/bittrex-api-generator';
import Poller from './lib/classes/Poller';
import Notifier from './lib/classes/Notifier';

//1. get deposit address (loop)
//2. RPC - send coin to adress
//3. get deposit history (loop until confirmed)
//4. get balance for coin
//5. sell at params

const poller = new Poller('BTC');
const notifier = new Notifier();

//console.log(JSON.stringify(poller));

poller.depositAddress()
	.then(result => {
		console.log(JSON.stringify(result, null, 2));
		
		notifier.notify('DNT has hit Bittrex');
	})
	.catch(err => console.error(err));