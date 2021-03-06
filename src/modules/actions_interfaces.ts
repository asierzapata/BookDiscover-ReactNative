import { AsyncConfigObject } from '../middleware/api_middleware'

export interface BaseAction {
	type: string
	meta: {
		[key: string]: any
	}
}

export interface AsyncAction extends BaseAction {
	AsyncProcess: (AsyncConfig: AsyncConfigObject) => Promise<{}>
	shouldDoAsyncProcess?: (state: object) => boolean
}

export interface AppAction extends BaseAction {
	payload?: object
	error?: boolean
}
