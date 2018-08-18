import _ from 'lodash'
import sequence from '../../../lib/sequence'

import ApiClient from '../../../api/config/api_config'

import parser from './open_library_parser'
import Constants from './open_library_constants'

/* ====================================================== */
/*                     Interfaces                         */
/* ====================================================== */

import { BookModule, BookModuleMethodsInput, LIMIT } from '../book_services_interface'
import { Book } from '../../../api/book/book_interfaces'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const api: BookModule = {
	searchByISBN,
    searchByStandardQuery,
    searchByAuthor,
    searchByTitle,
	searchBySubject,
	searchByPublisher,
	getEditionsByISBN
}

export default api

/* ====================================================== */
/*                        Content                         */
/* ====================================================== */

function searchByISBN({ ISBN }: BookModuleMethodsInput, page: number): Promise<Book[]> {
	const queryObject = Constants.QUERY_PARAMS.QUERY_ISBN
	return _searchRequestFactory(ISBN!, queryObject, page)
}

function searchByStandardQuery({ query }: BookModuleMethodsInput, page: number): Promise<Book[]> {
	console.log('>>>>> SEARCH BY STANDARD QUERY', query)
	const queryObject = Constants.QUERY_PARAMS.QUERY_STANDARD
	return _searchRequestFactory(query!, queryObject, page)
}

function searchByAuthor({ author }: BookModuleMethodsInput, page: number): Promise<Book[]> {
	const queryObject = Constants.QUERY_PARAMS.QUERY_AUTHOR
	return _searchRequestFactory(author!, queryObject, page)
}

function searchByTitle({ title }: BookModuleMethodsInput, page: number): Promise<Book[]> {
	const queryObject = Constants.QUERY_PARAMS.QUERY_TITLE
	return _searchRequestFactory(title!, queryObject, page)
}

function searchBySubject({ subject }: BookModuleMethodsInput, page: number): Promise<Book[]> {
	const queryObject = Constants.QUERY_PARAMS.QUERY_SUBJECT
	return _searchRequestFactory(subject!, queryObject, page)
}

function searchByPublisher({ publisher }: BookModuleMethodsInput, page: number): Promise<Book[]> {
	const queryObject = Constants.QUERY_PARAMS.QUERY_PUBLISHER
	return _searchRequestFactory(publisher!, queryObject, page)
}

function getEditionsByISBN({ ISBN }: BookModuleMethodsInput): Promise<string[]> {
	return new Promise(resolve => {
		const queryObject = Constants.QUERY_PARAMS.QUERY_ISBN
		_searchRequestFactory(ISBN!, queryObject, 0)
			.then(books => resolve(books[0].ISBN))
	})
}

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

function _searchRequestFactory(value: string, queryObject: { key: string, separator: string }, page: number): Promise<Book[]> {
	let docs: OpenLibraryBook[]
	return new Promise((resolve) => {
		ApiClient.get(`${Constants.SEARCH_PATH}?${_queryStringWithSeparatorAndPrefix(queryObject, value)}&limit=${LIMIT}&offset=${page*LIMIT}`, {})
			.then(response => {
				const data = response.data as OpenLibrarySearchResponse
				docs = data.docs
				return _getBatchDescriptionRequest(_.map(docs, (doc) => doc.key))
			})
			.then(descriptions => {
				resolve(parser.parseOpenLibraryReponse(docs, descriptions))
			})
	})
}

function _queryStringWithSeparatorAndPrefix(param: { key: string, separator: string }, value: string) {
	return `${param.key}${param.separator}${ _.join(_.split(_.trim(value), ' '), '+')}`
}

function _getBatchDescriptionRequest(keys: string[]): Promise<OpenLibraryBookResponse[]> {
	const batch = _.map(keys, (key) => {
		return _getDescriptionRequest(`${Constants.BASE_PATH}${key}.json`)
	})
	return Promise.all(batch)
}

function _getDescriptionRequest(path: string): Promise<OpenLibraryBookResponse> {
	return new Promise((resolve) => {
		ApiClient.get(path, {})
			.then(response => {
				const data = response.data as OpenLibraryBookResponse
				resolve(data)
			})
	})
}
