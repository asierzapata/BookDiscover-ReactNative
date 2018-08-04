import { combineReducers } from 'redux'
import _ from 'lodash'
import { asyncAction, asyncActionObject } from '../../lib/redux/async_action_creator'
import { AsyncAction, AppAction } from '../actions_interfaces'
import { getRequestStatus } from '../api_metadata/api_metadata_module'
import selectorCreatorFactory from '../../lib/redux/selectors'
import { Book } from '../../api/parsers/books_parser'
import { AuthData } from '../../api/parsers/user_parser'
import { User as UserInterface } from '../../api/parsers/user_parser'

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
		AsyncProcess: AsyncConfig => AsyncConfig.api.v1.userApi.logIn({ email, password }),
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
		AsyncProcess: AsyncConfig =>
			AsyncConfig.api.v1.userApi
				.signUp({ email, password })
				.then((user: UserInterface) => AsyncConfig.api.v1.userApi.addUser(user)),
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
		AsyncProcess: AsyncConfig => AsyncConfig.api.v1.userApi.getUserInfo(),
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
		AsyncProcess: AsyncConfig =>
			AsyncConfig.api.v1.userApi.addBookToUser({
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
