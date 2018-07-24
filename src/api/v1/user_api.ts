import _ from 'lodash'
import * as firebase from 'firebase'
import ApiConstants from '../config/api_constants'
import ApiErrors from '../config/api_errors'
import { ApiResponse, ApiError } from '../config/api_config';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default {
    getUserBooks,
    getUserInfo
}

export interface UserApiObject {
    getUserBooks: () => Promise<ApiResponse>,
    getUserInfo: () => Promise<ApiResponse>
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
                    resolve({
                        headers: '',
                        status: '200',
                        statusText: '',
                        data: document.data()
                    })
                } else {
                    reject({ 
                        code: 404, 
                        message: ApiErrors.NOT_FOUND
                    })
                }
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

