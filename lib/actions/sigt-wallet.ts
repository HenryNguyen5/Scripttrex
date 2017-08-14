const sigt = require('bitcoin')
import sigtClientConfig from '../configs/sigt-opts'

const client = new sigt.Client(sigtClientConfig)
const TX_FEE = 0.0001
const DEV = false

export const isValidTransferAmount = ({ balance, quantity }): boolean =>
	quantity && balance && balance >= quantity

export const getBalanceAsync = ({ address = '*', confirmations = 0 }) =>
	new Promise((resolve, reject) =>
		client.getBalance(address, confirmations, (err, balance) => {
			if (err) reject(err)
			return resolve(balance)
		})
	)

export const sendToAddressAsync = ({ address, quantity }) =>
	new Promise((resolve, reject) =>
		client.sendToAddress(address, quantity, (err, txid) => {
			if (err) reject(err)
			return resolve(txid)
		})
	)

export async function transferFunds({ address, quantity }) {
	const balance = await getBalanceAsync({})

	if (!isValidTransferAmount({ balance, quantity }))
		throw Error('Invalid transfer amount')

	const totalTransferAmount = quantity - TX_FEE

	let txId
	if (!DEV)
		txId = await sendToAddressAsync({ address, quantity: totalTransferAmount })
	return txId
}
