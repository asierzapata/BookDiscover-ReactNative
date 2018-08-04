import { AuthData } from '../parsers/user_parser'
import _ from 'lodash'
import * as firebase from 'firebase'
import '@firebase/firestore'
// import '@firebase/auth'
import ApiConstants from '../config/api_constants'
import ApiErrors from '../config/api_errors'
import { userParser, User as UserInterface } from '../parsers/user_parser'
import { Book as BookInterface } from '../parsers/books_parser'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const api: UserApiObject = {
	getUserBooks,
	addBookToUser,
	getUserInfo,
	// Auth
	logoutUser,
	logIn,
	signUp,
	addUser
}

export default api

export interface UserApiObject {
	getUserBooks: () => Promise<{}>
	addBookToUser: ({ ISBN, thumbnail }: BookInterface) => Promise<{}>
	getUserInfo: () => Promise<{}>
	logoutUser: () => Promise<{}>
	logIn: ({ email, password }: AuthData) => Promise<{}>
	signUp: ({ email, password }: AuthData) => Promise<{}>
	addUser: (user: firebase.User) => Promise<{}>
}

/* ====================================================== */
/*                     Authentication                     */
/* ====================================================== */

function logIn({ email, password }: AuthData) {
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

function signUp({ email, password }: AuthData) {
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

function addUser(user: firebase.User) {
	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.collection(ApiConstants.USERS_COLLECTION)
			.add({ user })
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

function logoutUser() {
	return new Promise((resolve, reject) => {
		firebase
			.auth()
			.signOut()
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
					code: 404,
					message: error.message
				})
			)
	})
}

/* ====================================================== */
/*                        Content                         */
/* ====================================================== */

function getUserBooks() {
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

function addBookToUser({ ISBN, thumbnail }: BookInterface) {
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
					const { books } = document.data() as { books: object[] }
					const data = { books: [...books, { ISBN, thumbnail }] }
					return firebase
						.firestore()
						.collection(ApiConstants.USERS_COLLECTION)
						.doc(currentUser.uid)
						.set(data, { merge: true })
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

function getUserInfo() {
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
