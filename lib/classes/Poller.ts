import api from '../bittrex-api/generator'
import IBittrex from '../bittrex-api/interface'
import opts from '../configs/coin-opts'

const CONSTANTS = {
	MAX_TIMES: 10
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default class Poller {
	ticker: string
	opts: {
		refreshInterval: number
	}
	api: IBittrex
	maxTimes: number

	constructor(
		ticker,
		maxTimes = CONSTANTS.MAX_TIMES,
		_api = api,
		_opts = opts
	) {
		//TODO: check for null here
		this.ticker = ticker
		this.maxTimes = maxTimes
		this.api = _api
		this.opts = _opts
	}

	getDepositAddress = async () =>
		await this.api.account.getDepositAddress({ currency: this.ticker })

	depositAddress = (times = 0) =>
		new Promise(async (resolve, reject) => {
			if (!this.ticker) {
				reject(new Error(`Cannot depositAddress without a ticker.`))
			}

			if (times >= this.maxTimes) {
				reject(
					new Error(
						`Attempted to depositAddress more than the limit of ${this
							.maxTimes}.`
					)
				)
			}

			try {
				const result = await this.poll()
				resolve(result)
			} catch (e) {
				await sleep(this.opts.refreshInterval * 1000)
				this.depositAddress(times++)
			}
		})

	poll = () =>
		new Promise(async (resolve, reject) => {
			try {
				const response = await this.getDepositAddress()
				const hasResponse = response.success && response.result
				const hasAddress = !!response.result.Address

				hasResponse && hasAddress ? resolve(response.result) : reject(response)
			} catch (e) {
				reject(e)
			}
		})
}
