import * as Web3 from 'web3'
import * as readline from 'readline'
import checkList from './checklist'

const DEFAULT_HOST = 'http://localhost:8545'
const web3 = new Web3(DEFAULT_HOST)
const DNT_ABI = require('./dnt-abi.json')
const DNT_ADDRESS = '0x0abdace70d3790235af448c88547603b945604ea'

const main = async () => {
	try {
		await checkList()
	} catch (e) {
		console.log(`Aborting due to check-list error: ${e.message}`)
		process.exit()
	}
	console.log('Check list passed, getting user accounts')
	const accounts = await web3.eth.getAccounts()
	console.log(accounts)
	const dnt = new web3.eth.Contract(DNT_ABI, DNT_ADDRESS, accounts[0])
	const balance = await dnt.methods.balanceOf(accounts[0]).call()
	const decimals = await dnt.methods.decimals().call()
}
const doTransfer = async () => {}
main()
