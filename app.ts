const sigt = require('bitcoin')
const config = require('./config')
import generatedApi from './lib/bittrex-api-generator'

const client = new sigt.Client(config)
const TX_FEE = 0.0001
const DEV = true

//console.log(generatedApi.account.getBalance({currency:'ETH'}));
const txid = async function pollBalance(_currency) {
	var response = generatedApi.account
		.getBalance({ currency: _currency })
		.then(function(res) {
			if (res['success'] == 'true') return res['CryptoAddress']
			else console.log('Not Found')
		})
	await sleep(2000)
}

function transfer(address, amount) {
	console.log(address)
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
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
