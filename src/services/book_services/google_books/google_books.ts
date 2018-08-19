import _ from 'lodash'

import ApiClient from '../../../api/config/api_config'
import ApiConstants from '../../../api/config/api_constants'

import parser from './google_books_parser'
import Constants from './google_books_constants'

/* ====================================================== */
/*                     Interfaces                         */
/* ====================================================== */

import { BookService, BookServiceMethodsInput, LIMIT } from '../book_services_interface'
import { Book, BooksQueryOptions } from '../../../api/book/book_interfaces'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const api: BookService = {
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

function searchByISBN({ ISBN }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions): Promise<Book[]> {
	const queryObject = Constants.QUERY_PARAMS.QUERY_ISBN
	return _searchRequestFactory(ISBN!, queryObject, queryOptions!, page)
}

function searchByStandardQuery({ query }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions): Promise<Book[]> {
	const queryObject = Constants.QUERY_PARAMS.QUERY_STANDARD
	console.log(query, queryOptions, page)
	return _searchRequestFactory(query!, queryObject, queryOptions!, page)
}

function searchByAuthor({ author }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions): Promise<Book[]> {
	const queryObject = Constants.QUERY_PARAMS.QUERY_AUTHOR
	return _searchRequestFactory(author!, queryObject, queryOptions!, page)
}

function searchByTitle({ title }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions): Promise<Book[]> {
	const queryObject = Constants.QUERY_PARAMS.QUERY_TITLE
	return _searchRequestFactory(title!, queryObject, queryOptions!, page)
}

function searchBySubject({ subject }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions): Promise<Book[]> {
	const queryObject = Constants.QUERY_PARAMS.QUERY_SUBJECT
	return _searchRequestFactory(subject!, queryObject, queryOptions!, page)
}

function searchByPublisher({ publisher }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions): Promise<Book[]> {
	const queryObject = Constants.QUERY_PARAMS.QUERY_PUBLISHER
	return _searchRequestFactory(publisher!, queryObject, queryOptions!, page)
}

function getEditionsByISBN(): Promise<string[]> {
	return Promise.resolve([])
}

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

function _searchRequestFactory(value: string, queryObject: { key: string, separator: string }, queryOptions: BooksQueryOptions, page: number): Promise<Book[]> {
	return new Promise((resolve, reject) => {
		console.log(`${Constants.SEARCH_PATH}?q=${_queryStringWithSeparatorAndPrefix(queryObject, value)}&maxResults=${LIMIT}&startIndex=${page*LIMIT}${_queryStringForQueryOptions(queryOptions, '=')}`)
		ApiClient.get(
			`${Constants.SEARCH_PATH}?q=${_queryStringWithSeparatorAndPrefix(queryObject, value)}&maxResults=${LIMIT}&startIndex=${page*LIMIT}${_queryStringForQueryOptions(queryOptions, '=')}`
			, {})
			.then(response => resolve(parser.parseGoogleReponse(response.data)))
			.catch(error => reject(error))
	})
}

function _queryStringWithSeparatorAndPrefix(param: { key: string, separator: string }, value: string) {
	return `${param.key}${param.separator}${ _.join(_.split(_.trim(value), ' '), '+')}`
}

function _queryStringForQueryOptions(queryOptions: BooksQueryOptions, separator: string) {
	return _.join(_.map(queryOptions, (value, option) => `&${Constants.QUERY_OPTIONS[option]}${separator}${_.trim(value)}`), '')
}