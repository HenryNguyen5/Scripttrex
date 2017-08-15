import * as Web3 from 'web3'
import * as readline from 'readline'
const DEFAULT_HOST = 'http://localhost:8545'
const web3 = new Web3(DEFAULT_HOST)
const DNT_ABI = require('./dnt-abi.json')
const DNT_ADDRESS = '0x0abdace70d3790235af448c88547603b945604ea'
const ENABLE_TX = true
const ENABLE_TX_PASS = 'get RICC'
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

const checkWeb3 = async () => {
	console.log(`Current web3 version: ${web3.version}`)
	const id = await web3.eth.net.getId()
	const msg =
		id === 1
			? `Connected to main-net at ID:${id}`
			: `Connected to non-main-net at ID: ${id}`
	console.log(msg)
	console.log(`Current peer count: ${await web3.eth.net.getPeerCount()}`)
	console.log(
		`Node still looking for peers: ${await web3.eth.net.isListening()}`
	)
}
const checkDNT = () => {
	console.log('Checking ABI and Address exists for DNT..')
	if (!DNT_ABI || !DNT_ADDRESS)
		throw new Error('ABI or ADDRESS not given for DNT, aborting')
}
const checkTX = async () => {
	if (ENABLE_TX) {
		console.warn('WARNING: TRANSACTION SENDING IS ENABLED')
		console.warn(`ENTER ${ENABLE_TX_PASS} (case-sensitive) TO CONTINUE`)
		await checkUserTXPassAsync()
	} else {
		console.log('Transaction sending disabled, test mode')
		rl.close()
	}
}
const checkList = async () => {
	await checkWeb3()
	checkDNT()
	await checkTX()
}
checkList()

const checkUserTXPassAsync = () =>
	new Promise((resolve, reject) => {
		rl.question('ENTER HERE:', answer => {
			if (answer !== ENABLE_TX_PASS) reject(new Error('Invalid pass entered'))
			rl.close()
			resolve()
		})
	})
