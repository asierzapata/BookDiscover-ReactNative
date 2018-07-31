import { combineReducers } from 'redux'
import _ from 'lodash'
import { asyncAction, asyncActionObject} from '../../lib/redux/async_action_creator';
import { AsyncAction, AppAction } from '../actions_interfaces';
import { getRequestStatus } from '../api_metadata/api_metadata_module'
import selectorCreatorFactory from '../../lib/redux/selectors';

/* ====================================================== */
/*                         Module                         */
/* ====================================================== */

export const MODULE_NAME = 'books'

/* ====================================================== */
/*                        Actions                         */
/* ====================================================== */

export const FETCH_BOOK_BY_ISBN = asyncActionObject('FETCH_BOOK_BY_ISBN')
export function fetchBookByISBN({ ISBN }: { ISBN: string }): AsyncAction {
    return {
        type: asyncAction('FETCH_BOOK_BY_ISBN'),
        AsyncProcess: AsyncConfig => 
            AsyncConfig.api.v1.bookApi.getBookInfoByISBN({ ISBN }),
        shouldDoAsyncProcess: state => 
            !getRequestStatus(state, {
                actionType: asyncAction('FETCH_BOOK_BY_ISBN')
            }).isLoading,
        meta : {}
    }
}

export const FETCH_BOOKS_BATCH_BY_ISBN = asyncActionObject('FETCH_BOOKS_BATCH_BY_ISBN')
export function fetchBooksBatchByISBN(ISBNArray : string[]): AsyncAction {
    return {
        type: asyncAction('FETCH_BOOKS_BATCH_BY_ISBN'),
        AsyncProcess: ({ dispatch }) => {
            const actions: AsyncAction[] = []
            _.forEach(ISBNArray, (ISBN) => 
                actions.push(
                    dispatch(fetchBookByISBN({ ISBN }))
                )
            )
            return Promise.all(actions)
        },
        shouldDoAsyncProcess: state => 
            !getRequestStatus(state, {
                actionType: asyncAction('FETCH_BOOKS_BATCH_BY_ISBN')
            }).isLoading,
        meta : {}
    }
}

export const FETCH_BOOKS_SEARCH = asyncActionObject('FETCH_BOOKS_SEARCH')
export function fetchBooksSearch(query: string): AsyncAction{
    return {
        type: asyncAction('FETCH_BOOKS_SEARCH'),
        AsyncProcess: AsyncConfig => 
            AsyncConfig.api.v1.bookApi.getBooksByQuery({ query }),
        shouldDoAsyncProcess: state => 
            !getRequestStatus(state, {
                actionType: asyncAction('FETCH_BOOKS_SEARCH')
            }).isLoading,
        meta : {}
    }
}

/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

function searchBooks(state = {}, { type, payload, meta } : AppAction) {
    switch(type) {
        case FETCH_BOOKS_SEARCH.SUCCESS:
            return payload
        default:
            return state
    }
}

function userBooks(state = {}, { type, payload, meta } : AppAction) {
    switch(type) {
        case FETCH_BOOK_BY_ISBN.SUCCESS:
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

export const debugingSelector = createSelector(state => state)
export const getSearchBooks = createSelector(state => state.searchBooks ? state.searchBooks : [])