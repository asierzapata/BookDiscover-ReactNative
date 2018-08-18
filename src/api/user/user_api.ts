import _ from 'lodash'
import * as firebase from 'firebase'
import '@firebase/firestore'
import ApiConstants from '../config/api_constants'
import ApiErrors from '../config/api_errors'

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
			.then(user => {
				resolve({
					headers: '',
					status: '200',
					statusText: '',
					data: userParser(user)
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
			.then(user => {
				console.log('>>>>> PROMISE SIGN UP RESOLVED', user)
				resolve({ headers: '', status: '200', statusText: '', data: userParser(user) })
			})
			.catch(e => {
				console.log('>>>>> PROMISE SIGN UP CATCHED', e)
				reject(e)
			})
	})
}

function addUser(user: UserInterface): Promise<ApiResponse> {
	console.log('>>>>>>> ADD USER', user)
	return new Promise((resolve, reject) => {
		const userInfo = { ...user, books: {} }
		console.log('>>>>> ADD USER PROMISE', userInfo)
		firebase
			.firestore()
			.collection(ApiConstants.USERS_COLLECTION)
			.doc(userInfo._id)
			.set(userInfo)
			.then(() => {
				console.log('>>>>> ADD USER SUCCESS')
				resolve({ headers: '', status: '200', statusText: '', data: user })
			})
			.catch(error => {
				console.log('>>>>> ADD USER ERROR', error)
				reject({
					code: 500,
					message: error.message
				})
			})
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

function addBookToUser({ ISBN, thumbnail, title, section }: AddBookParams): Promise<ApiResponse> {
	const { currentUser } = firebase.auth()
	if (_.isNull(currentUser)) {
		return Promise.reject({
			code: 401,
			error: ApiErrors.USER_NOT_LOGGED_IN
		})
	}

	const sectionsObject = _parseSection({ section })

	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.collection(ApiConstants.USERS_COLLECTION)
			.doc(currentUser.uid)
			.get()
			.then(document => {
				if (document.exists) {
					const { books } = document.data() as { books: FirestoreUserBooksSchema }
					books[ISBN] = { ISBN, thumbnail, title, ...sectionsObject }
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

function deleteBookToUser({ ISBN }: BookInterface): Promise<ApiResponse> {
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
					delete books[ISBN]
					return firebase
						.firestore()
						.collection(ApiConstants.USERS_COLLECTION)
						.doc(currentUser.uid)
						//.set({ ...document.data(), books })
						.update({ [`books.${ISBN}`] : firebase.firestore.FieldValue.delete() })
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
	console.log(currentUser)
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
					console.log('>>>>> DOCUMENT DATA',document.data())
					return firebase
						.firestore()
						.collection(ApiConstants.USERS_COLLECTION)
						.doc(currentUser.uid)
						.set({ ...document.data(), region })
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

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

function _parseSection({ section }: BookSections): { [key: string]: boolean } {
	const object = {} as { [key: string]: boolean }
	object[section] = true
	return object
}
