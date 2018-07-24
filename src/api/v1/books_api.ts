import firebase from 'firebase'
import ApiConstants from '../config/api_constants'
import ApiErrors from '../config/api_errors'
import { ApiResponse, ApiError } from '../config/api_config';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default {
    getBookInfo
}

export interface BookApiObject {
    getBookInfo: ({ ISBN }: { ISBN: string }) => Promise<ApiResponse>
}

/* ====================================================== */
/*                        Content                         */
/* ====================================================== */

function getBookInfo({ ISBN }: { ISBN: string }) {
    // TODO: value which implementation we want ffor the books:
    //      1 - Vanilla HTTP request directly to amazon or related service
    //      2 - Proxy through firestore where, if we don't find it, trigger the fetch locally and subsequent save
    return new Promise((reject,resolve) => {
        firebase.firestore().collection(ApiConstants.BOOKS_COLLECTION).doc(ISBN).get()
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
            .catch((error) => {
                reject({ 
                    code: 500, 
                    message: ApiErrors.NOT_FOUND
                })
            })
    })
}