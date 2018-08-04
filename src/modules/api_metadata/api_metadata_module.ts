import selectorCreatorFactory from '../../lib/redux/selectors'
import { asyncActionObject, ASYNC_ACTION_SEPARATOR } from '../../lib/redux/async_action_creator'
import { AnyAction } from 'redux'
import _ from 'lodash'

export const DEFAULT_NAMESPACE = '_no_namespace_'

/* ====================================================== */
/*                         Module                         */
/* ====================================================== */

export const MODULE_NAME = 'apiMetadata'

/* ====================================================== */
/*                       Interfaces                       */
/* ====================================================== */

export interface AsyncActionStatus {
	isLoading: boolean
	isLoaded: boolean
	error: string
	status: number
	statusText: string
}

/* ====================================================== */
/*                        Reducers                        */
/* ====================================================== */

export default function apiReducer(state: { [key: string]: any } = {}, { type, payload, meta = {} }: AnyAction) {
	if (!type) return state
	const parsedType = _.split(type, ASYNC_ACTION_SEPARATOR)
	if (parsedType.length < 2) {
		return state
	}

	const actionName = parsedType[0]

	const actionType = asyncActionObject(actionName)
	const namespace = _getNamespace({ requestId: meta.requestId })

	switch (type) {
		case actionType.REQUEST:
			return {
				...state,
				[actionName]: {
					...state[actionName],
					[namespace]: {
						isLoading: true,
						isLoaded: false,
						error: '',
						errorCode: '',
						status: null,
						statusText: ''
					}
				}
			}
		case actionType.SUCCESS:
			return {
				...state,
				[actionName]: {
					...state[actionName],
					[namespace]: {
						isLoading: false,
						isLoaded: true,
						error: '',
						errorCode: '',
						status: meta.status,
						statusText: meta.statusText
					}
				}
			}
		case actionType.FAILURE:
			return {
				...state,
				[actionName]: {
					...state[actionName],
					[namespace]: {
						isLoading: false,
						isLoaded: false,
						error: _.isObject(payload) ? payload.message : payload,
						errorCode: payload.errorCode,
						status: meta.status,
						statusText: meta.statusText
					}
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

export const getRequestStatus = createSelector((state, { actionType, requestId }) => {
	if (!state[actionType]) return {}
	return state[actionType][_getNamespace({ requestId })] || {}
})

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

function _getNamespace({ requestId = '' }) {
	return requestId || DEFAULT_NAMESPACE
}

/* ====================================================== */
/*                      Test Helpers                      */
/* ====================================================== */

export function stateForLoadingAction({ actionType, requestId }: { actionType: string; requestId: string }) {
	return stateForAction({
		actionState: { isLoading: true },
		actionType,
		requestId
	})
}

export function stateForAction({
	actionState,
	actionType,
	requestId
}: {
	actionState: object
	actionType: string
	requestId: string
}) {
	return {
		[MODULE_NAME]: {
			[actionType]: {
				[_getNamespace({ requestId })]: actionState
			}
		}
	}
}
