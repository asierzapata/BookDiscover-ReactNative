import { combineReducers } from 'redux'
import _ from 'lodash'
import { asyncAction, asyncActionObject } from '../../lib/redux/async_action_creator';
import { AsyncAction, AppAction } from '../actions_interfaces';
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

export const FETCH_USER_INFO = asyncActionObject('FETCH_USER_INFO')
export function fetchUserInfo(): AsyncAction {
    return {
        type: asyncAction(FETCH_USER_INFO.NAME),
        AsyncProcess: AsyncConfig => 
            AsyncConfig.api.v1.userApi.getUserInfo(),
        shouldDoAsyncProcess: state => 
            !getRequestStatus(state, {
                actionType: asyncAction(FETCH_USER_INFO.NAME)
            }).isLoading,
        meta : {}
    }
}

export const ADD_BOOK_USER = asyncActionObject('ADD_BOOK_USER')
export function addBookUser({ ISBN, thumbnail }: Book): AsyncAction {
    return {
        type: asyncAction(ADD_BOOK_USER.NAME),
        AsyncProcess: AsyncConfig => 
            AsyncConfig.api.v1.userApi.addBookToUser({ ISBN, thumbnail } as Book),
        shouldDoAsyncProcess: state => 
            !getRequestStatus(state, {
                actionType: asyncAction(ADD_BOOK_USER.NAME)
            }).isLoading,
        meta : {}
    }
}

/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

function userInfo(state = {}, { type, payload, meta } : AppAction) {
    switch(type) {
        case FETCH_USER_INFO.SUCCESS:
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
