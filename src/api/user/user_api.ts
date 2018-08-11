import _ from 'lodash'
import * as firebase from 'firebase'
import '@firebase/firestore'
import ApiConstants from '../config/api_constants'
import ApiErrors from '../config/api_errors'

/* ====================================================== */
/*                     Interfaces                         */
/* ====================================================== */

import { Book as BookInterface } from '../book/book_interfaces'
import { AuthData, UserApiObject, User as UserInterface, firestoreUserBooksSchema } from './user_interfaces'

/* ====================================================== */
/*                   	Parsers                           */
/* ====================================================== */

import { userParser } from './user_parsers'
import { ApiResponse } from '../config/api_interfaces'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const api: UserApiObject = {
	getUserBooks,
	addBookToUser,
	deleteBookToUser,
	getUserInfo,
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
				resolve({ headers: '', status: '200', statusText: '', data: userParser(user) })
			})
			.catch(e => reject(e))
	})
}

function addUser(user: UserInterface): Promise<ApiResponse> {
	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.collection(ApiConstants.USERS_COLLECTION)
			.doc(user._id)
			.set({ userInfo: user, books: [] })
			.then(doc => {
				resolve({ headers: '', status: '200', statusText: '', data: user })
			})
			.catch(error => {
				reject({
					code: 500,
					message: error.message
				})
			})
	})
}

function logOut(): Promise<ApiResponse> {
	return firebase.auth().signOut()
}

/* ====================================================== */
/*                        Content                         */
/* ====================================================== */

function getUserBooks(): Promise<ApiResponse> {
	const { currentUser } = firebase.auth()
	if (_.isNull(currentUser))
		return Promise.reject({
			code: 401,
			error: ApiErrors.USER_NOT_LOGGED_IN
		})
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

function addBookToUser({ ISBN, thumbnail, title }: BookInterface): Promise<ApiResponse> {
	const { currentUser } = firebase.auth()
	if (_.isNull(currentUser))
		return Promise.reject({
			code: 401,
			error: ApiErrors.USER_NOT_LOGGED_IN
		})

	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.collection(ApiConstants.USERS_COLLECTION)
			.doc(currentUser.uid)
			.get()
			.then(document => {
				if (document.exists) {
					const { books } = document.data() as { books: firestoreUserBooksSchema }
					books[ISBN] = { ISBN, thumbnail, title }
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
	if (_.isNull(currentUser))
		return Promise.reject({
			code: 401,
			error: ApiErrors.USER_NOT_LOGGED_IN
		})

	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.collection(ApiConstants.USERS_COLLECTION)
			.doc(currentUser.uid)
			.get()
			.then(document => {
				if (document.exists) {
					const { books } = document.data() as { books: firestoreUserBooksSchema }
					delete books[ISBN]
					return firebase
						.firestore()
						.collection(ApiConstants.USERS_COLLECTION)
						.doc(currentUser.uid)
						.set({ books })
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
