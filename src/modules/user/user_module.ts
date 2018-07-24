import { combineReducers } from 'redux'
import _ from 'lodash'
import apiAction from '../../lib/redux/api_action_creator';
import { AsyncAction, AsyncBreakdownAction } from '../actions_interfaces';
import { getRequestStatus } from '../api_metadata/api_metadata_module'
import selectorCreatorFactory from '../../lib/redux/selectors';

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

/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

function user(state = {}, { type, payload, meta } : AsyncBreakdownAction) {
    switch(type.NAME) {
        case FETCH_USER_INFO.SUCCESS:
            return payload
        default:
            return state
    }
}

export default combineReducers({
	user
})

/* ====================================================== */
/*                       Selectors                        */
/* ====================================================== */

const createSelector = selectorCreatorFactory(MODULE_NAME)

// -----------
