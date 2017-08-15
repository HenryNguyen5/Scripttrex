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
	}
}
main()
