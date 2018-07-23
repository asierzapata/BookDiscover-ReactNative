import { combineReducers } from 'redux'
import _ from 'lodash'
import apiAction from '../../lib/redux/api_action_creator';
import { AsyncAction } from '../actions_interfaces';
import { getRequestStatus } from '../api_metadata/api_metadata_module'

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