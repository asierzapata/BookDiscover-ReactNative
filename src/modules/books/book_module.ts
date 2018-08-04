import { combineReducers } from 'redux'
import _ from 'lodash'
import { asyncAction, asyncActionObject } from '../../lib/redux/async_action_creator'
import { AsyncAction, AppAction } from '../actions_interfaces'
import { getRequestStatus } from '../api_metadata/api_metadata_module'
import selectorCreatorFactory from '../../lib/redux/selectors'

/* ====================================================== */
/*                         Module                         */
/* ====================================================== */

export const MODULE_NAME = 'books'

/* ====================================================== */
/*                         Api                            */
/* ====================================================== */

import bookApi from '../../api/book/book_api'
import userApi from '../../api/user/user_api'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { Book } from '../../api/book/book_interfaces';

/* ====================================================== */
/*                        Actions                         */
/* ====================================================== */

export const FETCH_BOOK_BY_ISBN = asyncActionObject('FETCH_BOOK_BY_ISBN')
export function fetchBookByISBN({ ISBN }: { ISBN: string }): AsyncAction {
	return {
		type: asyncAction(FETCH_BOOK_BY_ISBN.NAME),
		AsyncProcess: ({ dispatch }) => bookApi.getBookInfoByISBN({ ISBN }),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(FETCH_BOOK_BY_ISBN.NAME)
			}).isLoading,
		meta: {}
	}
}

export const FETCH_BOOKS_BATCH_BY_ISBN = asyncActionObject('FETCH_BOOKS_BATCH_BY_ISBN')
export function fetchBooksBatchByISBN(ISBNArray: string[]): AsyncAction {
	return {
		type: asyncAction(FETCH_BOOKS_BATCH_BY_ISBN.NAME),
		AsyncProcess: ({ dispatch }) => {
			const actions: AsyncAction[] = []
			_.forEach(ISBNArray, ISBN => actions.push(dispatch(fetchBookByISBN({ ISBN }))))
			return Promise.all(actions)
		},
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(FETCH_BOOKS_BATCH_BY_ISBN.NAME)
			}).isLoading,
		meta: {}
	}
}

export const FETCH_BOOKS_SEARCH = asyncActionObject('FETCH_BOOKS_SEARCH')
export function fetchBooksSearch(query: string, page: number): AsyncAction {
	return {
		type: asyncAction(FETCH_BOOKS_SEARCH.NAME),
		AsyncProcess: ({ dispatch }) => bookApi.getBooksByQuery({ query, page }),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(FETCH_BOOKS_SEARCH.NAME)
			}).isLoading,
		meta: {}
	}
}

export const FETCH_USER_BOOKS = asyncActionObject('FETCH_USER_BOOKS')
export function fetchUserBooks(): AsyncAction {
	return {
		type: asyncAction(FETCH_USER_BOOKS.NAME),
		AsyncProcess: ({ dispatch }) => userApi.getUserBooks(),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(FETCH_USER_BOOKS.NAME)
			}).isLoading,
		meta: {}
	}
}

export const POPULATE_BOOK_BY_ISBN = asyncActionObject('POPULATE_BOOK_BY_ISBN')
export function populateBookByISBN(ISBN: string): AsyncAction {
	return {
		type: asyncAction(POPULATE_BOOK_BY_ISBN.NAME),
		AsyncProcess: () =>
			bookApi.getBookInfoByISBN({ ISBN }),
		shouldDoAsyncProcess: state =>
			!getRequestStatus(state, {
				actionType: asyncAction(POPULATE_BOOK_BY_ISBN.NAME)
			}).isLoading,
		meta: {}
	}
}


/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

function searchBooks(state = {}, { type, payload }: AppAction) {
	switch (type) {
        case FETCH_BOOKS_SEARCH.SUCCESS:
            const books = payload as Book[]
			return [...state as Book[], ...books]
		default:
			return state
	}
}

function userBooks(state = {}, { type, payload }: AppAction) {
	switch (type) {
        case POPULATE_BOOK_BY_ISBN.SUCCESS:
            const book = payload as Book
	        return {
				...state,
				[book.ISBN]: {
					...book
				}
			}
		case FETCH_USER_BOOKS.SUCCESS:
			return payload
		default:
			return state
	}
}

export default combineReducers({
	searchBooks,
	userBooks
})

/* ====================================================== */
/*                       Selectors                        */
/* ====================================================== */

const createSelector = selectorCreatorFactory(MODULE_NAME)

// -----------

export const getSearchBooks = createSelector(state => (state.searchBooks ? state.searchBooks : []))
export const getUserBooks = createSelector(state => (state.userBooks ? state.userBooks : []))
