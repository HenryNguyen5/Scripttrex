import * as request from 'request-promise-native'
interface Market {
	market: string
}
interface Quantity {
	quantity: string
}
interface Rate {
	rate: string
}
interface Type {
	type: string
}
interface Uuid {
	uuid: string
}
interface Currency {
	currency: string
}
interface Address {
	address: string
}
interface PaymentId {
	paymentid?: string
}
export default interface BittrexApi {
	public: {
		getMarkets: () => request.RequestPromise
		getCurrencies: () => request.RequestPromise // Used to get all supported currencies at Bittrex along with other meta data.
		getTicker: (queryString: Market) => request.RequestPromise // Used to get the current tick values for a market.
		getMarketSummaries: () => request.RequestPromise
		getMarketSummary: (queryString: Market) => request.RequestPromise
		getOrderBook: (queryString: Market & Type) => request.RequestPromise
		getMarketHistory: (queryString: Market) => request.RequestPromise
	}
	market: {
		buyLimit: (queryString: Market & Quantity & Rate) => request.RequestPromise
		sellLimit: (queryString: Market & Quantity & Rate) => request.RequestPromise
		cancel: (queryString: Uuid) => request.RequestPromise
		getOpenOrders: (queryString?: Market) => request.RequestPromise
	}
	account: {
		getBalances: () => request.RequestPromise
		getBalance: (queryString: Currency) => request.RequestPromise
		getDepositAddress: (queryString: Currency) => request.RequestPromise
		withdraw: (
			queryString: Currency & Quantity & Address & PaymentId
		) => request.RequestPromise
		getOrder: (queryString: Uuid) => request.RequestPromise
		getOrderHistory: (queryString?: Market) => request.RequestPromise
		getWithdrawlHistory: (queryString?: Currency) => request.RequestPromise
		getDepositHistory: (queryString?: Currency) => request.RequestPromise
	}
}
