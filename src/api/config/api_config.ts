import axios, { AxiosResponse } from 'axios'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const apiClient = axios.create({
	timeout: 10000,
	headers: {
		'Content-Type': 'text/html',
		'User-Agent':
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
		'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6'
	}
})

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

export default {
	// GET
	get,
	post,
	put,
	remove
}

/* ====================================================== */
/*                         Users                          */
/* ====================================================== */

function get(path: string, axiosConfig: object) {
	return apiClient.get(path, axiosConfig).then(_parseResponse)
}

function post(path: string, data: object, axiosConfig: object) {
	return apiClient.post(path, data, axiosConfig).then(_parseResponse)
}

function put(path: string, data: object, axiosConfig: object) {
	return apiClient.put(path, data, axiosConfig).then(_parseResponse)
}

function remove(path: string, axiosConfig: object) {
	return apiClient.delete(path, axiosConfig).then(_parseResponse)
}

function _parseResponse({ data, headers, status, statusText }: AxiosResponse) {
	return { data, headers, status, statusText }
}
