const hmacSha512 = require('./hmac-sha512.js')
import opts from './request-opts'
const getNonce = () => Math.floor(new Date().getTime() / 1000)

export default {
	qsFromObject: (obj): string =>
		`?${Object.keys(obj).reduce(
			(str, key, index) => `${str}${index === 0 ? '' : '&'}${key}=${obj[key]}`,
			''
		)}`,

	formFullUrl: (base: string, path: string, queryString: string): string =>
		`${base}/${path}/${queryString}`,

	formApiPath: (...paths): string =>
		paths.reduce(
			(fullPath: string, currentPath: string, currentIndex) =>
				`${fullPath}${currentPath.toLowerCase()}${currentIndex ===
				paths.length - 1
					? ''
					: '/'}`,
			''
		),

	signUrl: (url: string) => ({
		apisign: hmacSha512.HmacSHA512(url, opts.apisecret)
	}),

	makeAuthorizedQs: methodType =>
		methodType === 'public'
			? { nonce: getNonce() }
			: { apikey: opts.apikey, nonce: getNonce() }
}
