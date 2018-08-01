import _ from 'lodash'
import * as firebase from 'firebase'
import '@firebase/firestore'
// import '@firebase/auth'
import ApiConstants from '../config/api_constants'
import ApiErrors from '../config/api_errors'
import { Book } from '../parsers/books_parser';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const api: UserApiObject = {
    getUserBooks,
    addBookToUser,
    getUserInfo,
    logoutUser
}

export default api 

export interface UserApiObject {
    getUserBooks: () => Promise<{}>,
    addBookToUser: ({ ISBN, thumbnail } : Book) => Promise<{}>,
    getUserInfo: () => Promise<{}>,
    logoutUser: () => Promise<{}>
}

/* ====================================================== */
/*                        Content                         */
/* ====================================================== */

function getUserBooks() {
    const { currentUser } = firebase.auth()
    if(_.isNull(currentUser)) 
        return Promise.reject({ 
            code: 401, 
            error: ApiErrors.USER_NOT_LOGGED_IN
        })
    return new Promise((resolve, reject) => {
        firebase.firestore().collection(ApiConstants.USERS_COLLECTION).doc(currentUser.uid).get()
            .then((document) => {
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

function addBookToUser({ ISBN, thumbnail } : Book) {
    const { currentUser } = firebase.auth()
    if(_.isNull(currentUser)) 
        return Promise.reject({ 
            code: 401, 
            error: ApiErrors.USER_NOT_LOGGED_IN
        })

    return new Promise((resolve, reject) => {
        firebase.firestore().collection(ApiConstants.USERS_COLLECTION).doc(currentUser.uid).get()
            .then((document) => {
                if (document.exists) {
                    const { books } = document.data() as { books: object[] }
                    const data = { books: [...books,{ ISBN, thumbnail }]}
                    return firebase.firestore().collection(ApiConstants.USERS_COLLECTION).doc(currentUser.uid).set(data, { merge: true })
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
            .catch((error) => {
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
        if(currentUser) {
            resolve({ 
                headers: '',
                status: '200',
                statusText: '',
                data: currentUser
            })
        }
        reject({ 
            code: 404, 
            message: ApiErrors.USER_NOT_LOGGED_IN
        })
    })
}

function logoutUser() {
    return new Promise((resolve, reject) => {
        firebase.auth()
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

