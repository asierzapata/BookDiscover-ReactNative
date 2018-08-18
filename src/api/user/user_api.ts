import _ from 'lodash'
import * as firebase from 'firebase'
import '@firebase/firestore'
import ApiConstants from '../config/api_constants'
import ApiErrors from '../config/api_errors'

import BookApi from '../book/book_api'

/* ====================================================== */
/*                     Interfaces                         */
/* ====================================================== */

import { Book as BookInterface, AddBookParams, BookSections } from '../book/book_interfaces'
import { AuthData, UserApiObject, User as UserInterface, FirestoreUserBooksSchema } from './user_interfaces'

/* ====================================================== */
/*                   	Parsers                           */
/* ====================================================== */

import { userParser } from './user_parsers'
import { ApiResponse } from '../config/api_interfaces'
import { Region } from '../../modules/user/user_module';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const api: UserApiObject = {
	getUserBooks,
	addBookToUser,
	deleteBookToUser,
	getUserInfo,
	setUserRegion,
	// Auth
	logOut,
	logIn,
	signUp,
	addUser
}

export default api

/* ====================================================== */
/*                     Authentication                     */
/* ====================================================== */

function logIn({ email, password }: AuthData): Promise<ApiResponse> {
	return new Promise((resolve, reject) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				const { user } = userCredentials
				resolve({
					headers: '',
					status: '200',
					statusText: '',
					data: userParser(user!)
				})
			})
			.catch(e => reject(e))
	})
}

function signUp({ email, password }: AuthData): Promise<ApiResponse> {
	return new Promise((resolve, reject) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				const { user } = userCredentials
				resolve({
					headers: '',
					status: '200',
					statusText: '',
					data: userParser(user!)
				})
			})
			.catch(e => reject(e))
	})
}

function addUser(user: UserInterface): Promise<ApiResponse> {
	return new Promise((resolve, reject) => {
		const userInfo = { ...user, books: {} }
		firebase
			.firestore()
			.collection(ApiConstants.USERS_COLLECTION)
			.doc(userInfo._id)
			.set(userInfo)
			.then(() => resolve({ headers: '', status: '200', statusText: '', data: user }))
			.catch(error => 
				reject({
					code: 500,
					message: error.message
				})
			)
	})
}

function logOut(): Promise<ApiResponse> {
	return new Promise((resolve, reject) =>
		firebase
			.auth()
			.signOut()
			.then(() => resolve({ headers: '', status: '200', statusText: '', data: '' }))
			.catch(error => reject({ code: 500, message: error.message }))
	)
}

/* ====================================================== */
/*                        Content                         */
/* ====================================================== */

function getUserBooks(): Promise<ApiResponse> {
	const { currentUser } = firebase.auth()
	if (_.isNull(currentUser)) return Promise.reject({ code: 401, error: ApiErrors.USER_NOT_LOGGED_IN })
	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.collection(ApiConstants.USERS_COLLECTION)
			.doc(currentUser.uid)
			.get()
			.then(document => {
				if (document.exists) {
					const data = document.data()
					resolve({
						headers: '',
						status: '200',
						statusText: '',
						data: data!.books
					})
				} else {
					resolve({
						headers: '',
						status: '200',
						statusText: '',
						data: []
					})
				}
			})
	})
}

function addBookToUser({ ISBN, thumbnail, title, section, work_key, edition_key }: AddBookParams): Promise<ApiResponse> {
	const { currentUser } = firebase.auth()
	if (_.isNull(currentUser)) {
		return Promise.reject({
			code: 401,
			error: ApiErrors.USER_NOT_LOGGED_IN
		})
	}

	const sectionsObject = _parseSection({ section })

	const userDocumentRef = firebase.firestore().collection(ApiConstants.USERS_COLLECTION).doc(currentUser.uid)
	const bookCollectionReg = firebase.firestore().collection(ApiConstants.BOOKS_COLLECTION)

	let bookDocumentId: string

	return new Promise((resolve, reject) => {
		bookCollectionReg.where('ISBN', 'array-contains', ISBN[0])
			.get()
			.then(document => {
				if(document.empty) {
					return BookApi.createNewBook(ISBN, { work_key, edition_key })
				}
				return Promise.resolve(document.docs[0].id)
			})
			.then(id => {
				bookDocumentId = id
				return userDocumentRef.get()
			})
			.then(document => {
				if (document.exists) {
					const { books } = document.data() as { books: FirestoreUserBooksSchema }
					books[bookDocumentId] = { _id: bookDocumentId, thumbnail, title, ...sectionsObject }
					return firebase
						.firestore()
						.collection(ApiConstants.USERS_COLLECTION)
						.doc(currentUser.uid)
						.set({ books }, { merge: true })
				} else {
					reject({
						code: 500,
						message: ApiErrors.NOT_FOUND
					})
				}
			})
			.then(() => {
				resolve({
					headers: '',
					status: '200',
					statusText: '',
					data: ''
				})
			})
			.catch(error => {
				reject({
					code: 500,
					message: error.message
				})
			})
	})
}

function deleteBookToUser({ _id }: BookInterface): Promise<ApiResponse> {
	const { currentUser } = firebase.auth()
	if (_.isNull(currentUser)) {
		return Promise.reject({
			code: 401,
			error: ApiErrors.USER_NOT_LOGGED_IN
		})
	}

	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.collection(ApiConstants.USERS_COLLECTION)
			.doc(currentUser.uid)
			.get()
			.then(document => {
				if (document.exists) {
					const { books } = document.data() as { books: FirestoreUserBooksSchema }
					delete books[_id]
					return firebase
						.firestore()
						.collection(ApiConstants.USERS_COLLECTION)
						.doc(currentUser.uid)
						.update({ [`books.${_id}`] : firebase.firestore.FieldValue.delete() })
				} else {
					reject({
						code: 500,
						message: ApiErrors.NOT_FOUND
					})
				}
			})
			.then(() => {
				resolve({
					headers: '',
					status: '200',
					statusText: '',
					data: ''
				})
			})
			.catch(error => {
				reject({
					code: 500,
					message: error.message
				})
			})
	})
}

function getUserInfo(): Promise<ApiResponse> {
	const { currentUser } = firebase.auth()
	return new Promise((resolve, reject) => {
		if (currentUser) {
			resolve({
				headers: '',
				status: '200',
				statusText: '',
				data: userParser(currentUser)
			})
		}
		reject({
			code: 404,
			message: ApiErrors.USER_NOT_LOGGED_IN
		})
	})
}

function setUserRegion(region: Region): Promise<ApiResponse> {
	const { currentUser } = firebase.auth()
	if (_.isNull(currentUser)) {
		return Promise.reject({
			code: 401,
			error: ApiErrors.USER_NOT_LOGGED_IN
		})
	}

	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.collection(ApiConstants.USERS_COLLECTION)
			.doc(currentUser.uid)
			.set({ region }, { merge: true })
			.then(() => 
				resolve({
					headers: '',
					status: '200',
					statusText: '',
					data: ''
				})
			)
			.catch(error => 
				reject({
					code: 500,
					message: error.message
				})
			)
	})
}

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

function _parseSection({ section }: BookSections): { [key: string]: boolean } {
	const object = {} as { [key: string]: boolean }
	object[section] = true
	return object
}
