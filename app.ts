import generatedApi from './lib/bittrex-api-generator'
import {getBalanceAsync, sendToAddressAsync, isValidTransferAmount, transferFunds} from './sigt-wallet'
import {pollDepositAddress, sellFundsOnArrival} from './bittrex-commands'

function initSale(currency, quantity, price){
	pollDepositAddress(currency)
		.then((address) =>{
			transferFunds({address:address, quantity:quantity});
		})
		.then(() => {
			sellFundsOnArrival({currency, quantity, price})
		})
}

initSale('DOGE', 100, 0.00009999)