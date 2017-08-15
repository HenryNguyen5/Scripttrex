import generatedApi from '../bittrex-api/generator'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function pollDepositAddress(currency) {
	try {
		const response = await generatedApi.account.getDepositAddress({ currency })
		if (!response.success) throw Error('Call to api failed')
		return response.result.Address
	} catch (e) {
		console.log('Deposit Address not found... Trying again in thirty seconds..') //Switch this to 30s
		await sleep(2000)
		await pollDepositAddress(currency)
	}
}

export async function sellFundsOnArrival({ currency, quantity, price }) {
	try {
		const response = await generatedApi.account.getBalance({ currency })
		if (!response.success) throw Error('Funds not in account')
		sellFunds({ currency, quantity, price })
	} catch (e) {
		console.log(
			'Funds have not yet arrived.... Polling balance again in five seconds'
		)
		await sleep(5000)
		await sellFundsOnArrival(currency)
	}
}

async function sellFunds({ currency, quantity, price }) {
	try {
		const market = 'BTC-' + currency
		const response = await generatedApi.market.sellLimit({
			market: market,
			quantity: quantity,
			rate: price
		})
		if (!response.success) throw Error('Call to api failed')
		console.log('Limit sell placed at ' + price + ' for ' + quantity + ' units')
	} catch (e) {
		console.log('Sell failed... Trying again in five seconds')
		await sleep(5000)
		await sellFunds({ currency, quantity, price })
	}
}
