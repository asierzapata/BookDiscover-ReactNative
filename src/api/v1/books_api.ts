import firebase from 'firebase'
import ApiConstants from '../config/api_constants'
import ApiErrors from '../config/api_errors'
import ApiClient from '../config/api_config'

import BookParser from '../parsers/books_parser'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const api: BookApiObject = {
    getBookInfoByISBN,
    getBooksByQuery
}

export default api

export interface BookApiObject {
    getBookInfoByISBN: ({ ISBN }: { ISBN: string }) => Promise<{}>,
    getBooksByQuery: ({ query, page }: { query: string, page: number })  => Promise<{}>
}

/* ====================================================== */
/*                        Content                         */
/* ====================================================== */

function getBookInfoByISBN({ ISBN }: { ISBN: string }) {
    return new Promise((resolve,reject) => {
        ApiClient.get(`${ApiConstants.SEARCH_PATH}?q=isbn:${ISBN}`, {})
            .then((response) => {
                const { data } = response
                if (data) {
                    resolve({
                        headers: '',
                        status: '200',
                        statusText: '',
                        data: BookParser.parseGoogleReponse(data)
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

function getBooksByQuery({ query, page = 0 }: { query: string, page: number }) {
    return new Promise((resolve, reject) => {
        ApiClient.get(`${ApiConstants.SEARCH_PATH}?q=${query}?startIndex=${page}`, {})
            .then((response) => {
                const { data } = response
                if (data) {
                    resolve({
                        headers: response.headers,
                        status: response.status,
                        statusText: response.statusText,
                        data: BookParser.parseGoogleReponse(data)
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