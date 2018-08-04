import { combineReducers, AnyAction } from 'redux'

/* ====================================================== */
/*                    Custom Reducers                     */
/* ====================================================== */

// Data
// --------

import booksReducer, { MODULE_NAME as books } from './books/book_module'
import userReducer, { MODULE_NAME as user, LOG_OUT } from './user/user_module'

// Metadata
// --------
import apiMetadataReducer, { MODULE_NAME as apiMetadata } from './api_metadata/api_metadata_module'

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

const appReducer = combineReducers({
	// Data
	[user]: userReducer,
	[books]: booksReducer,
	// Metadata
	[apiMetadata]: apiMetadataReducer
})

const rootReducer = (state: any, action: AnyAction) => {
	if (action.type === LOG_OUT.NAME) {
		// Reset whole store on logout
		return appReducer(undefined, action)
	}
	return appReducer(state, action)
}

export default rootReducer
