import selectorCreatorFactory from '../../lib/redux/selectors'
import apiAction, { API_ACTION_SEPARATOR, ApiActionNames } from '../../lib/redux/api_action_creator'
import { AnyAction } from 'redux';
import _ from 'lodash'

/* ====================================================== */
/*                         Module                         */
/* ====================================================== */

export const MODULE_NAME = 'apiMetadata'

/* ====================================================== */
/*                       Interfaces                       */
/* ====================================================== */

export interface AsyncActionStatus {
    isLoading: boolean,
    isLoaded: boolean,
    error: string,
    status: number,
    statusText: string
}

/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

export default function apiReducer(state = {}, { type, payload, meta = {} }: AnyAction) {
    if (!type) return state
    const parsedType = _.split(type, API_ACTION_SEPARATOR)
    if (parsedType.length < 2) {
        return state
    }

    const actionType = apiAction(parsedType[0])
    const namespace = _getNamespace({ actionType, requestId: meta.requestId })

    switch (type) {
        case actionType.REQUEST:
            return {
                ...state,
                [namespace]: {
                    isLoading: true,
                    isLoaded: false,
                    error: '',
                    status: null,
                    statusText: ''
                }
            }
        case actionType.SUCCESS:
            return {
                ...state,
                [namespace]: {
                    isLoading: false,
                    isLoaded: true,
                    error: '',
                    status: meta.status,
                    statusText: meta.statusText
                }
            }
        case actionType.FAILURE:
            return {
                ...state,
                [namespace]: {
                    isLoading: false,
                    isLoaded: false,
                    error: payload.error,
                    status: meta.status,
                    statusText: meta.statusText
                }
            }
        default:
            return state
    }
}

/* ====================================================== */
/*                       Selectors                        */
/* ====================================================== */

const createSelector = selectorCreatorFactory(MODULE_NAME)

export const getRequestStatus = createSelector(
    (state, { actionType, requestId }) => state[_getNamespace({ actionType, requestId })] || {}
)

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

function _getNamespace({ actionType, requestId }: { actionType: ApiActionNames, requestId: string }) {
    return requestId ? `${actionType.NAME}-${requestId}` : actionType.NAME
}

/* ====================================================== */
/*                      Test Helpers                      */
/* ====================================================== */

export function stateForLoadingAction({ actionType, requestId }: { actionType: ApiActionNames, requestId: string }) {
    return stateForAction({
        actionState: { isLoading: true },
        actionType,
        requestId
    })
}

export function stateForAction({ actionState, actionType, requestId }: { actionState: object, actionType: ApiActionNames, requestId: string }) {
    return {
        [MODULE_NAME]: {
            [_getNamespace({ actionType, requestId })]: actionState
        }
    }
}
