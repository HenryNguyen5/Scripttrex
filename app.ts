import generatedApi from './lib/bittrex-api/bittrex-api-generator';
import { pollDepositAddress, sellFundsOnArrival } from './lib/actions/bittrex-commands';
import {
	getBalanceAsync,
	sendToAddressAsync,
	isValidTransferAmount,
	transferFunds
} from './lib/actions/sigt-wallet';

const initSale = (currency, quantity, price) => (
	pollDepositAddress(currency)
		.then(address => transferFunds({ address, quantity }))
		.then(() => sellFundsOnArrival({ currency, quantity, price }))
		.catch(e => console.error(e))
);

initSale('DOGE', 100, 0.00009999);