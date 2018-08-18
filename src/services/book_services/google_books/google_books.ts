import ApiClient from '../../../api/config/api_config'
import ApiConstants from '../../../api/config/api_constants'

import parser from './google_books_parser'

/* ====================================================== */
/*                     Interfaces                         */
/* ====================================================== */

import { BookModule, BookModuleMethodsInput } from '../book_services_interface'
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

function searchByISBN({ ISBN }: BookModuleMethodsInput): Promise<Book[]> {
	return new Promise((resolve, reject) => {
		ApiClient.get(`${ApiConstants.SEARCH_PATH}?q=isbn:${ISBN}`, {})
			.then(response => resolve(parser.parseGoogleReponse(response.data)))
			.catch(error => reject(error))
	})
}

function searchByStandardQuery(): Promise<Book[]> {
	return Promise.resolve([])
}

function searchByAuthor(): Promise<Book[]> {
		return Promise.resolve([])
}

function searchByTitle(): Promise<Book[]> {
		return Promise.resolve([])
}

function searchBySubject(): Promise<Book[]> {
		return Promise.resolve([])
}

function searchByPublisher(): Promise<Book[]> {
		return Promise.resolve([])
}

function getEditionsByISBN(): Promise<string[]> {
		return Promise.resolve([])
}