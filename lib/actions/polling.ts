/*
* Handles polling
*
*/

import api from "../bittrex-api/bittrex-api-generator";
import opts from "../configs/options";


/*abstract class Poller {
	ticker: string;
	name: string;
	constructor({name, ticker}) { this.name = name; this.ticker = ticker });
}*/

export default class Poll {	
	constructor() {};
	
	DepositAddress(ticker) {
		return new Promise((resolve, reject) => {
			let interval;
		
			//Todo: finish function
			async function getDepositAddress() {
				return await api.account.getDepositAddress({ currency: ticker });
			}
			
			const poll = async() => {
				const response = await getDepositAddress();
				
				console.log(JSON.stringify(response, undefined, 2));
				
				if (response.success && response.result) {
					if (response.result.Address !== "") {
						//Address wasn't generated in time - no response request again
						clearInterval(interval);
						setTimeout(poll, 5000,ticker);
					} else {
						resolve(response.result);
					}
				} else if (response.message === "ADDRESS_GENERATING") {
					//Shorten interval period as next request will likely have an address
					clearInterval(interval);
				   setTimeout(poll, 5000,ticker);
				}
				else {
					reject(response);
				}
			}
			
			interval = setInterval(poll, opts.refreshInterval*1000);
		});
	}		
}

//export = Poll;



//1. get deposit address (loop)
//2. RPC - send coin to adress
//3. get deposit history (loop until confirmed)
//4. get balance for coin
//5. sell at params
