import generatedApi from './lib/bittrex-api/bittrex-api-generator'
import {getBalanceAsync, sendToAddressAsync, isValidTransferAmount, transferFunds} from './lib/actions/sigt-wallet'
import {pollDepositAddress, sellFundsOnArrival} from './lib/actions/bittrex-commands'

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