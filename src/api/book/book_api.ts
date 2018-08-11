import firebase from 'firebase'
import _ from 'lodash'
import ApiConstants from '../config/api_constants'
import ApiErrors from '../config/api_errors'
import ApiClient from '../config/api_config'

import BookParser from './book_parsers'

/* ====================================================== */
/*                     Interfaces                         */
/* ====================================================== */

import { BookApiObject, BooksQueryOptions, BooksQueryFields } from './book_interfaces'
import { ApiError, ApiResponse } from '../config/api_interfaces';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const api: BookApiObject = {
	getBookInfoByISBN,
	getBooksByQuery
}

export default api

/* ====================================================== */
/*                        Content                         */
/* ====================================================== */

function getBookInfoByISBN({ ISBN }: { ISBN: string }): Promise<ApiResponse> {
	return new Promise((resolve, reject) => {
		ApiClient.get(`${ApiConstants.SEARCH_PATH}?q=isbn:${ISBN}`, {})
			.then(response => {
				const { data } = response
				if (data) {
					resolve({
						headers: '',
						status: '200',
						statusText: '',
						data: BookParser.parseIndividualBook(data.items[0].volumeInfo)
					})
				} else {
					reject({
						code: 404,
						message: ApiErrors.NOT_FOUND
					})
				}
			})
			.catch(error => {
				reject({
					code: 500,
					message: ApiErrors.NOT_FOUND
				})
			})
	})
}

function getBooksByQuery({ query, queryOptions = {}, queryField = {}, page = 0 }: { query: string, page: number, queryOptions?: BooksQueryOptions, queryField?: BooksQueryFields}): Promise<{}> {
	const { QUERY_FIELDS, QUERY_OPTIONS } = ApiConstants.QUERY_SEPARATORS
	const queryFieldString = _queryStringWithSeparatorAndPrefix(queryField, QUERY_FIELDS.prefix, QUERY_FIELDS.separator)
	const queryOptionsString = _queryStringWithSeparatorAndPrefix(queryOptions, QUERY_OPTIONS.prefix, QUERY_OPTIONS.separator)
	const searchPath = `${ApiConstants.SEARCH_PATH}?q=${query}${queryFieldString}&startIndex=${page}${queryOptionsString}`

	console.log('>>>>>>>', query, queryOptions, queryField)
	console.log('>>>>>>> search path', searchPath)

	return new Promise((resolve, reject) => {
		ApiClient.get(searchPath, {})
			.then(response => {
				const { data } = response
				if (data) {
					resolve({
						headers: response.headers,
						status: response.status,
						statusText: response.statusText,
						data: BookParser.parseGoogleReponse(data)
					})
				} else {
					reject({
						code: 404,
						message: ApiErrors.NOT_FOUND
					})
				}
			})
			.catch(error => {
				reject({
					code: 500,
					message: ApiErrors.NOT_FOUND
				})
			})
	})
}

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

function _queryStringWithSeparatorAndPrefix(options: BooksQueryOptions | BooksQueryFields, prefix: string, separator: string) {
	return _.join(_.map(options, (value, option) => `${prefix}${option}${separator}${_.trim(value)}`), '')
}