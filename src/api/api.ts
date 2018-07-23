/* ====================================================== */
/*                        API v1                          */
/* ====================================================== */

import bookApi, { BookApiObject } from './v1/books_api'
import userApi, { UserApiObject } from './v1/user_api'

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

const apiObject: ApiObject = {
  v1: {
    bookApi,
    userApi
  }
}

export default apiObject

export interface ApiObject {
  v1: {
    bookApi: BookApiObject,
    userApi: UserApiObject
  }
}
