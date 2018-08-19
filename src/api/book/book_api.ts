import _ from 'lodash'
import firebase from 'firebase'
import '@firebase/firestore'
import ApiErrors from '../config/api_errors'

/* ====================================================== */
/*                      Services                          */
/* ====================================================== */

import OpenLibrary from '../../services/book_services/open_library/open_library'
import GoogleBooks from '../../services/book_services/google_books/google_books'

/* ====================================================== */
/*                     Interfaces                         */
/* ====================================================== */

import { BookApiObject, BooksQueryField, BooksQueryFields, Book, BooksQueryOptions } from './book_interfaces'
import { ApiResponse } from '../config/api_interfaces';
import ApiConstants from '../config/api_constants';
import { BookService } from '../../services/book_services/book_services_interface';
import { SearchEngine } from '../user/user_interfaces';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const api: BookApiObject = {
	getBookInfoByISBN,
	getBooksByQuery,
	createNewBook
}

export default api

/* ====================================================== */
/*                        Content                         */
/* ====================================================== */

function getBookInfoByISBN({ ISBN }: { ISBN: string }): Promise<ApiResponse> {
	return new Promise((resolve, reject) => {
		OpenLibrary.searchByISBN({ ISBN }, 0)
			.then(data => {
				console.log(data)
				resolve({
					headers: '',
					status: '',
					statusText: '',
					data
				})
			})
			.catch(error => {
				reject({
					code: 500,
					message: ApiErrors.NOT_FOUND
				})
			})
	})
}

function getBooksByQuery(
	{ query, queryField = BooksQueryFields.standard, queryOptions, engine, page = 0 }: 
	{ query: string, page: number, queryField?: BooksQueryFields, queryOptions?: BooksQueryOptions, engine: SearchEngine }
): Promise<ApiResponse> {
	return new Promise((resolve, reject) => {
		let promise: () => Promise<Book[] | string[]> = () => Promise.resolve([])
		let Service: BookService
		Service = (queryOptions && !_.isEmpty(queryOptions)) ? GoogleBooks : OpenLibrary
		switch(queryField) {
			case BooksQueryFields.standard:
				promise = () => Service.searchByStandardQuery({ query }, page)
				break;
			case BooksQueryFields.isbn:
				promise = () => Service.searchByISBN({ ISBN: query }, page)
				break;
			case BooksQueryFields.author:
				promise = () => Service.searchByAuthor({ author: query }, page)
				break;
			case BooksQueryFields.subject:
				promise = () => Service.searchBySubject({ subject: query }, page)
				break;
			case BooksQueryFields.title:
				promise = () => Service.searchByTitle({ title: query }, page)
				break;
			default:
				reject({
					code: 500,
					message: ApiErrors.INCORRECT_PARAM
				})
				break;
		}
		promise()
			.then(data => {
				resolve({
					headers: '',
					status: '',
					statusText: '',
					data
				})
			})
			.catch(() => {
				reject({
					code: 500,
					message: ApiErrors.NOT_FOUND
				})
			})
	})
}

function createNewBook( ISBN: string, title: string ): Promise<string> {
	return new Promise((resolve, reject) => {
		OpenLibrary.searchByISBN({ ISBN }, 0)
			.then(books => {
				const book = books[0]
				return firebase
					.firestore()
					.collection(ApiConstants.BOOKS_COLLECTION)
					.add({ ISBN: book.ISBN, title, services: { OpenLibrary: { work_key: book.work_key, edition_key: book.edition_key } } })
			})
			.then(document => resolve(document.id))
			.catch(error => reject(error))
	})
}