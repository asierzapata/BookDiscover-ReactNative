import _ from 'lodash'
import firebase from 'firebase'
import '@firebase/firestore'
import ApiErrors from '../config/api_errors'

/* ====================================================== */
/*                      Services                          */
/* ====================================================== */

import OpenLibrary from '../../services/book_services/open_library/open_library'

/* ====================================================== */
/*                     Interfaces                         */
/* ====================================================== */

import { BookApiObject, BooksQueryField, BooksQueryFields, Book, BooksQueryOptions } from './book_interfaces'
import { ApiResponse } from '../config/api_interfaces';
import ApiConstants from '../config/api_constants';

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
	{ query, queryField = BooksQueryFields.standard, queryOptions, page = 0 }: 
	{ query: string, page: number, queryField?: BooksQueryFields, queryOptions?: BooksQueryOptions }
): Promise<ApiResponse> {
	return new Promise((resolve, reject) => {
		let promise: () => Promise<Book[] | string[]> = () => Promise.resolve([])
		switch(queryField) {
			case BooksQueryFields.standard:
				promise = () => OpenLibrary.searchByStandardQuery({ query }, page)
				break;
			case BooksQueryFields.isbn:
				promise = () => OpenLibrary.searchByISBN({ ISBN: query }, page)
				break;
			case BooksQueryFields.author:
				promise = () => OpenLibrary.searchByAuthor({ author: query }, page)
				break;
			case BooksQueryFields.subject:
				promise = () => OpenLibrary.searchBySubject({ subject: query }, page)
				break;
			case BooksQueryFields.title:
				promise = () => OpenLibrary.searchByTitle({ title: query }, page)
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