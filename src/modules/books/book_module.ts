import { combineReducers } from 'redux'
import _ from 'lodash'
import apiAction from '../../lib/redux/api_action_creator';
import { AsyncAction, AsyncBreakdownAction } from '../actions_interfaces';
import { getRequestStatus } from '../api_metadata/api_metadata_module'
import selectorCreatorFactory from '../../lib/redux/selectors';

/* ====================================================== */
/*                         Module                         */
/* ====================================================== */

export const MODULE_NAME = 'books'

/* ====================================================== */
/*                        Actions                         */
/* ====================================================== */

export const FETCH_BOOK_BY_ISBN = apiAction('FETCH_BOOK_BY_ISBN')
export function fetchBookByISBN({ ISBN }: { ISBN: string }): AsyncAction {
    return {
        type: FETCH_BOOK_BY_ISBN,
        AsyncProcess: AsyncConfig => 
            AsyncConfig.api.v1.bookApi.getBookInfoByISBN({ ISBN }),
        shouldDoAsyncProcess: state => 
            !getRequestStatus(state, {
                actionType: FETCH_BOOK_BY_ISBN
            }).isLoading,
        meta : {}
    }
}

export const FETCH_BOOKS_BATCH_BY_ISBN = apiAction('FETCH_BOOKS_BATCH_BY_ISBN')
export function fetchBooksBatchByISBN(ISBNArray : string[]): AsyncAction {
    return {
        type: FETCH_BOOKS_BATCH_BY_ISBN,
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
                actionType: FETCH_BOOKS_BATCH_BY_ISBN
            }).isLoading,
        meta : {}
    }
}

export const FETCH_BOOKS_SEARCH = apiAction('FETCH_BOOKS_SEARCH')
export function fetchBooksSearch(query: string): AsyncAction{
    return {
        type: FETCH_BOOKS_SEARCH,
        AsyncProcess: AsyncConfig => 
            AsyncConfig.api.v1.bookApi.getBooksByQuery({ query }),
        shouldDoAsyncProcess: state => 
            !getRequestStatus(state, {
                actionType: FETCH_BOOKS_SEARCH
            }).isLoading,
        meta : {}
    }
}

/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

function books(state = {}, { type, payload, meta } : AsyncBreakdownAction) {
    console.log('>>>>> REDUCER BOOKS', payload)
    switch(type.NAME) {
        case FETCH_BOOK_BY_ISBN.SUCCESS:
        case FETCH_BOOKS_SEARCH.SUCCESS:
            return payload
        default:
            return state
    }
}

export default combineReducers({
	books
})

/* ====================================================== */
/*                       Selectors                        */
/* ====================================================== */

const createSelector = selectorCreatorFactory(MODULE_NAME)

// -----------

export const debugingSelector = createSelector(state => state)
export const getSearchBooks = createSelector(state => {
    console.log('>>>>> SELECTOR ', state)
    return state.books ? state.books : []
})