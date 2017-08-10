export default {
	public: {
		getMarkets: {}, // Used to get the open and available trading markets at Bittrex along with other meta data.
		getCurrencies: {}, // Used to get all supported currencies at Bittrex along with other meta data.
		getTicker: {}, // Used to get the current tick values for a market.
		getMarketSummaries: {},
		getMarketSummary: {},
		getOrderBook: {},
		getMarketHistory: {}
	},
	market: {
		buyLimit: {},
		sellLimit: {},
		cancel: {},
		getOpenOrders: {}
	},
	account: {
		getBalances: {},
		getBalance: {},
		getDepositAddress: {},
		withdraw: {},
		getOrder: {},
		getOrderHistory: {},
		getWithdrawlHistory: {},
		getDepositHistory: {}
	}
}
