import { AsyncConfigObject } from '../middleware/api_middleware'
import { ApiResponse } from '../api/config/api_config';
import { ApiActionNames } from '../lib/redux/api_action_creator';

export interface BaseAction {
    type: ApiActionNames,
    meta: {
        [key: string]: any
    }
}

export interface AsyncAction extends BaseAction {
    AsyncProcess: (AsyncConfig: AsyncConfigObject) => Promise<ApiResponse>,
    shouldDoAsyncProcess?: (state: object) => boolean
}

export interface AsyncBreakdownAction extends BaseAction {
    payload?: object,
    error?: boolean
}
