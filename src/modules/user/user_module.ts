import { combineReducers } from 'redux'
import { asyncAction, asyncActionObject } from '../../lib/redux/async_action_creator'
import { AsyncAction, AppAction } from '../actions_interfaces'
import { getRequestStatus } from '../api_metadata/api_metadata_module'
import selectorCreatorFactory from '../../lib/redux/selectors'

/* ====================================================== */
/*                         Api                            */
/* ====================================================== */

import userApi from '../../api/user/user_api'
import bookApi from '../../api/book/book_api'

/* ====================================================== */
/*                     Interfaces                         */
/* ====================================================== */

import { Book } from '../../api/book/book_interfaces'

/* ====================================================== */
/*                   	Parsers                           */
/* ====================================================== */

import { User as UserInterface, AuthData } from '../../api/user/user_interfaces'
import { ApiResponse } from '../../api/config/api_interfaces'

/* ====================================================== */
/*                         Module                         */
/* ====================================================== */

export const MODULE_NAME = 'user'

/* ====================================================== */
/*                        Actions                         */
/* ====================================================== */

export const LOG_IN = asyncActionObject('LOG_IN')
export function logIn({ email, password }: AuthData): AsyncAction {
	return {
		type: asyncAction(LOG_IN.NAME),
		AsyncProcess: ({ dispatch }) => userApi.logIn({ email, password }),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(LOG_IN.NAME)
			}).isLoading,
		meta: {}
	}
}

export const SIGN_UP = asyncActionObject('SIGN_UP')
export function signUp({ email, password }: AuthData): AsyncAction {
	return {
		type: asyncAction(SIGN_UP.NAME),
		AsyncProcess: ({ dispatch }) =>
			userApi.signUp({ email, password }).then((data: ApiResponse) => userApi.addUser(data.data)),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(SIGN_UP.NAME)
			}).isLoading,
		meta: {}
	}
}

export const FETCH_USER_INFO = asyncActionObject('FETCH_USER_INFO')
export function fetchUserInfo(): AsyncAction {
	return {
		type: asyncAction(FETCH_USER_INFO.NAME),
		AsyncProcess: ({ dispatch }) => userApi.getUserInfo(),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(FETCH_USER_INFO.NAME)
			}).isLoading,
		meta: {}
	}
}

export const ADD_BOOK_USER = asyncActionObject('ADD_BOOK_USER')
export function addBookUser({ ISBN, thumbnail }: Book): AsyncAction {
	return {
		type: asyncAction(ADD_BOOK_USER.NAME),
		AsyncProcess: ({ dispatch }) =>
			userApi.addBookToUser({
				ISBN,
				thumbnail
			} as Book),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(ADD_BOOK_USER.NAME)
			}).isLoading,
		meta: {}
	}
}

export const DELETE_BOOK_USER = asyncActionObject('DELETE_BOOK_USER')
export function deleteBookUser({ ISBN, thumbnail }: Book): AsyncAction {
	return {
		type: asyncAction(ADD_BOOK_USER.NAME),
		AsyncProcess: ({ dispatch }) =>
			userApi.deleteBookToUser({
				ISBN,
				thumbnail
			} as Book),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(ADD_BOOK_USER.NAME)
			}).isLoading,
		meta: {}
	}
}

/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

function userInfo(state = {}, { type, payload, meta }: AppAction) {
	switch (type) {
		case FETCH_USER_INFO.SUCCESS:
		case LOG_IN.SUCCESS:
		case SIGN_UP.SUCCESS:
			return payload
		default:
			return state
	}
}

export default combineReducers({
	userInfo
})

/* ====================================================== */
/*                       Selectors                        */
/* ====================================================== */

const createSelector = selectorCreatorFactory(MODULE_NAME)

// -----------
