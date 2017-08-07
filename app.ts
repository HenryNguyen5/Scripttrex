const sigt = require('bitcoin')
const config = require('./config')
import generatedApi from './lib/bittrex-api-generator'
const client = new sigt.Client(config)
const TX_FEE = 0.0001
const DEV = true

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

//console.log(generatedApi.account.getBalance({currency:'ETH'}));
const txid = async function pollBalance(currency) {
	try {
		const response = await generatedApi.account.getBalance({ currency })
		if (response.success === false) throw Error('Call to api failed')
		//do everything you need to here...
	} catch (e) {
		console.log('Trying again in two seconds..')
		await sleep(2000)
		pollBalance(currency)
	}
}

function transfer(address, amount) {
	console.log(address)
}

async function transferFunds({ address, amount }) {
	const balance = await getBalanceAsync({})

	if (!isValidTransferAmount({ balance, amount }))
		throw Error('Invalid transfer amount')

	const totalTransferAmount = amount - TX_FEE

	let txId

	if (!DEV)
		txId = await sentToAddressAsync({ address, amount: totalTransferAmount })
}

//transfer(txid('ETH'),10);
const isValidTransferAmount = ({ balance, amount }): boolean =>
	amount && balance && balance >= amount ? true : false

const getBalanceAsync = ({ address = '*', confirmations = 0 }) =>
	new Promise((resolve, reject) =>
		client.getBalance(address, confirmations, (err, balance) => {
			if (err) reject(err)
			return resolve(balance)
		})
	)

const sentToAddressAsync = ({ address, amount }) =>
	new Promise((resolve, reject) =>
		client.sendToAddress(address, amount, (err, txid) => {
			if (err) reject(err)
			return resolve(txid)
		})
	)
