const hmacSha512 = require('./hmac-sha512.js')
const request = require('request-promise-native')
const opts = {
	baseUrl: 'https://bittrex.com/api/v1.1',
	apikey: 'APIKEY',
	apisecret: 'APISECRET'
}
const getNonce = () => Math.floor(new Date().getTime() / 1000)

const api = {
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
const makeQueryString = obj =>
	`?${Object.keys(obj).reduce(
		(str, key, index) => `${str}${index === 0 ? '' : '&'}${key}=${obj[key]}`,
		''
	)}`

const generateBittrexApi = () =>
	Object.keys(api).reduce((bittrexApi, methodType) => {
		//make the group to fill the methods in with
		bittrexApi[methodType] = {}

		Object.keys(api[methodType]).forEach(method => {
			const urlPrefix = `${methodType}/${method.toLowerCase()}`
			// If its a method that needs authorization, including it in the query string parameters
			const authQs =
				methodType === 'public'
					? { nonce: getNonce() }
					: { apikey: opts.apikey, nonce: getNonce() }

			// Each method on the bittrex api can accept custom query strings
			bittrexApi[methodType][method] = async customQueryStrings => {
				const qs = makeQueryString({ ...customQueryStrings, ...authQs })
				const url = `${opts.baseUrl}/${urlPrefix}/${qs}`
				return request(url, {
					headers: {
						apisign: hmacSha512.HmacSHA512(url, opts.apisecret),
						json: true //parse the response body JSON
					}
				})
			}
		})
		return bittrexApi
	}, {})

module.exports = { bittrexApi: generateBittrexApi() }
