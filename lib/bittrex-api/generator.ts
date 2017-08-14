import * as request from 'request-promise-native'
import api from './metadata'
import opts from '../configs/request-opts'
import IBittrex from './interface'
import urlUtils from './urlUtils'

const reduceObject = <T>(obj, reducer): T =>
	Object.keys(obj).reduce(reducer, obj as T)

const makeRequest = url =>
	request(url, {
		headers: urlUtils.signUrl(url),
		json: true //parse the response body JSON
	})

const bittrexReducer = (bittrexApi, methodType): IBittrex => {
	Object.keys(api[methodType]).forEach(method => {
		const apiPath = urlUtils.formApiPath(methodType, method),
			authQs = urlUtils.makeAuthorizedQs(methodType)

		// Each method on the bittrex api can accept custom query strings
		bittrexApi[methodType][method] = customQueryStrings => {
			const qs = urlUtils.qsFromObject({ ...customQueryStrings, ...authQs }),
				url = urlUtils.formFullUrl(opts.baseUrl, apiPath, qs)

			return makeRequest(url)
		}
	})
	return bittrexApi
}

const generatedApi: IBittrex = reduceObject<IBittrex>(api, bittrexReducer)

export default generatedApi
