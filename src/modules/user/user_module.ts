import { combineReducers } from 'redux'
import _ from 'lodash'
import apiAction from '../../lib/redux/api_action_creator';
import { AsyncAction, AsyncBreakdownAction } from '../actions_interfaces';
import { getRequestStatus } from '../api_metadata/api_metadata_module'
import selectorCreatorFactory from '../../lib/redux/selectors';
import { Book } from '../../api/parsers/books_parser';

/* ====================================================== */
/*                         Module                         */
/* ====================================================== */

export const MODULE_NAME = 'user'

/* ====================================================== */
/*                        Actions                         */
/* ====================================================== */

export const FETCH_USER_INFO = apiAction('FETCH_USER_INFO')
export function fetchUserInfo(): AsyncAction {
    return {
        type: FETCH_USER_INFO,
        AsyncProcess: AsyncConfig => 
            AsyncConfig.api.v1.userApi.getUserInfo(),
        shouldDoAsyncProcess: state => 
            !getRequestStatus(state, {
                actionType: FETCH_USER_INFO
            }).isLoading,
        meta : {}
    }
}


export const FETCH_USER_BOOKS = apiAction('FETCH_USER_BOOKS')
export function fetchUserBooks(): AsyncAction {
    return {
        type: FETCH_USER_BOOKS,
        AsyncProcess: AsyncConfig => 
            AsyncConfig.api.v1.userApi.getUserBooks(),
        shouldDoAsyncProcess: state => 
            !getRequestStatus(state, {
                actionType: FETCH_USER_BOOKS
            }).isLoading,
        meta : {}
    }
}

export const ADD_BOOK_USER = apiAction('ADD_BOOK_USER')
export function addBookUser({ ISBN, thumbnail }: Book): AsyncAction {
    return {
        type: ADD_BOOK_USER,
        AsyncProcess: AsyncConfig => 
            AsyncConfig.api.v1.userApi.addBookToUser({ ISBN, thumbnail } as Book),
        shouldDoAsyncProcess: state => 
            !getRequestStatus(state, {
                actionType: ADD_BOOK_USER
            }).isLoading,
        meta : {}
    }
}

/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

function userInfo(state = {}, { type, payload, meta } : AsyncBreakdownAction) {
    switch(type.NAME) {
        case FETCH_USER_INFO.SUCCESS:
            return payload
        default:
            return state
    }
}

function books(state = {}, { type, payload, meta } : AsyncBreakdownAction) {
    switch(type.NAME) {
        case FETCH_USER_BOOKS.SUCCESS:
            return payload
        default:
            return state
    }
}

export default combineReducers({
    userInfo,
    books
})

/* ====================================================== */
/*                       Selectors                        */
/* ====================================================== */

const createSelector = selectorCreatorFactory(MODULE_NAME)

// -----------

export const userBooks = createSelector(state => state.books ? state.books : [])
