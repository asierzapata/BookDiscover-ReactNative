import ClientApi, { ApiObject } from '../api/api'
import { Dispatch, MiddlewareAPI } from 'redux';
import { BaseAction, AsyncAction, AppAction } from '../modules/actions_interfaces'
import { ApiResponse, ApiError } from '../api/config/api_config'
import { AsyncActionNames, ASYNC_ACTION_ID, asyncActionObject } from '../lib/redux/async_action_creator'
import _ from 'lodash'

/* ====================================================== */
/*                        Middleware                      */
/* ====================================================== */

export interface AsyncConfigObject {
    api: ApiObject,
    dispatch: Dispatch
}

const apiMiddleware = ({ getState, dispatch }: MiddlewareAPI) => (next: Dispatch) => (action: AsyncAction) => {
    const { type, AsyncProcess, shouldDoAsyncProcess = () => true, meta = {} } = action

    if (!AsyncProcess) return next(action)

    if (!_.startsWith(type, ASYNC_ACTION_ID)) {
        throw new Error('Expected action type created with apiAction(...)')
    }

    if (!shouldDoAsyncProcess(getState())) return

    const asyncBreakdownNames = asyncActionObject(_.split(type, `${ASYNC_ACTION_ID}_`)[1])

    next(requestAction({ type: asyncBreakdownNames.REQUEST, meta }))

    return new Promise<void>((resolve: ( response: any ) => void, reject: ( err: ApiError ) => void) => {
        AsyncProcess({
            api: ClientApi,
            dispatch
        })
            .then(response => {
                next(successAction({ type: asyncBreakdownNames.SUCCESS, response, meta }))
                next(alwaysAction({ type: asyncBreakdownNames.ALWAYS, meta: { ...meta, ..._extractResponseMetadata(response as ApiResponse) } }))
                resolve(response) 
            })
            .catch(err => {
                const error = err as ApiError
                // If it's an error from API
                if (error.code) {
                    next(firebaseFailure({ type: asyncBreakdownNames.FAILURE , error, meta }))
                    next(
                        alwaysAction({
                            type: asyncBreakdownNames.ALWAYS,
                            meta: { ...meta, isFirebaseError: true }
                        })
                    )
                } else {
                    // It's a Runtime error of our client side code
                    next(runtimeFailureAction({ type: asyncBreakdownNames.FAILURE, error, meta }))
                    next(alwaysAction({ type: asyncBreakdownNames.ALWAYS, meta: { ...meta, isFirebaseError: false } }))
                    reject(error)
                }
            })
    })
}

export default apiMiddleware

/* ====================================================== */
/*                         Helpers                        */
/* ====================================================== */

export function requestAction({ type, meta }: BaseAction) {
    return { type, meta }
}

export function successAction({ type, response, meta }: { type: string, response: any, meta: object}): AppAction {
    return {
        type,
        payload: response.data,
        meta: { ..._extractResponseMetadata(response), ...meta }
    }
}

export function firebaseFailure({ type, error, meta }: { type: string, error: ApiError, meta: object}): AppAction {
    return {
        type,
        error: true,
        payload: error,
        meta: { ...meta, isDeveloperError: false, ..._extractErrorMetadata(error) }
    }
}

export function runtimeFailureAction({ type, error, meta }: { type: string, error: ApiError, meta: object}): AppAction {
    return {
        type,
        error: true,
        payload: error,
        meta: { ...meta, isDeveloperError: true }
    }
}

export function alwaysAction({ type, meta } : BaseAction) {
    return { type, meta }
}

function _extractResponseMetadata({ headers = {}, status, statusText = '' }: ApiResponse) {
	return { headers, status, statusText }
}

function _extractErrorMetadata({ code, message } : ApiError) {
    return { code, message }
}
