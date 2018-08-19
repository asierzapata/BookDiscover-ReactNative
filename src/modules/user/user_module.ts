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

import { Book, AddBookParams } from '../../api/book/book_interfaces'

/* ====================================================== */
/*                   	Parsers                           */
/* ====================================================== */

import { User as UserInterface, AuthData, SearchEngines } from '../../api/user/user_interfaces'
import { ApiResponse } from '../../api/config/api_interfaces'

/* ====================================================== */
/*                         Module                         */
/* ====================================================== */

export const MODULE_NAME = 'user'

/* ====================================================== */
/*                        Actions                         */
/* ====================================================== */

// Authentication
// ------------

export const LOG_IN = asyncActionObject('LOG_IN')
export function logIn({ email, password }: AuthData): AsyncAction {
	return {
		type: asyncAction(LOG_IN.NAME),
		AsyncProcess: ({ dispatch }) => 
			userApi.logIn({ email, password }).then(() => userApi.getUserInfo()),
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
			userApi.signUp({ email, password })
				.then((data: ApiResponse) => userApi.addUser(data.data))
				.then(() => userApi.getUserInfo()),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(SIGN_UP.NAME)
			}).isLoading,
		meta: {}
	}
}

export const LOG_OUT = asyncActionObject('LOG_OUT')
export function logOut(): AsyncAction {
	return {
		type: asyncAction(LOG_OUT.NAME),
		AsyncProcess: ({ dispatch }) => userApi.logOut(),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(LOG_OUT.NAME)
			}).isLoading,
		meta: {}
	}
}

// User

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

export const SET_USER_REGION = asyncActionObject('SET_USER_REGION')
export function setUserRegion(region: Region): AsyncAction {
	return {
		type: asyncAction(SET_USER_REGION.NAME),
		AsyncProcess: ({ dispatch }) =>
			userApi.setUserRegion(region),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(SET_USER_REGION.NAME)
			}).isLoading,
		meta: {}
	}
}

export const ADD_BOOK_USER = asyncActionObject('ADD_BOOK_USER')
export function addBookUser({ ISBN, thumbnail, title, section }: AddBookParams): AsyncAction {
	return {
		type: asyncAction(ADD_BOOK_USER.NAME),
		AsyncProcess: ({ dispatch }) =>
			userApi.addBookToUser({
				ISBN,
				thumbnail,
				title,
				section
			} as AddBookParams),
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
		type: asyncAction(DELETE_BOOK_USER.NAME),
		AsyncProcess: ({ dispatch }) =>
			userApi.deleteBookToUser({
				ISBN,
				thumbnail
			} as Book),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(DELETE_BOOK_USER.NAME)
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

export const getUserSearchEngine = createSelector(state => (state.userInfo.settings.searchEngine ? state.userInfo.settings.searchEngine : SearchEngines.GoogleBooks) )

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

export enum Region {
	'spain' = 'es',
	'unitedStates' = 'us'
}
