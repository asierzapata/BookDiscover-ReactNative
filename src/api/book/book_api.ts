import _ from 'lodash'
import * as firebase from 'firebase'
import '@firebase/firestore'
import ApiErrors from '../config/api_errors'

/* ====================================================== */
/*                      Services                          */
/* ====================================================== */

import OpenLibrary from '../../services/book_services/open_library/open_library'

/* ====================================================== */
/*                     Interfaces                         */
/* ====================================================== */

import { BookApiObject, BooksQueryField, BooksQueryFields, Book } from './book_interfaces'
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
	{ query, queryField = BooksQueryFields.standard, page = 0 }: 
	{ query: string, page: number, queryField?: BooksQueryFields }
): Promise<ApiResponse> {
	return new Promise((resolve, reject) => {
		let promise: Promise<Book[] | string[]> = Promise.resolve([])
		switch(queryField) {
			case BooksQueryFields.standard:
				promise = OpenLibrary.searchByStandardQuery({ query }, page)
			case BooksQueryFields.isbn:
				promise = OpenLibrary.searchByISBN({ ISBN: query }, page)
			case BooksQueryFields.author:
				promise = OpenLibrary.searchByAuthor({ author: query }, page)
			case BooksQueryFields.subject:
				promise = OpenLibrary.searchBySubject({ subject: query }, page)
			case BooksQueryFields.title:
				promise = OpenLibrary.searchByTitle({ title: query }, page)
			default:
				reject({
					code: 500,
					message: ApiErrors.INCORRECT_PARAM
				})
				break;
		}
		promise
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

function createNewBook( ISBN: string[], OpenLibrary: { work_key: string, edition_key: string[] }): Promise<string> {
	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.collection(ApiConstants.USERS_COLLECTION)
			.add({ ISBN, services: { OpenLibrary } })
			.then(document => resolve(document.id))
			.catch(error => reject(error))
	})
}