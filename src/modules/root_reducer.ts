import { combineReducers, AnyAction } from 'redux'

/* ====================================================== */
/*                    Custom Reducers                     */
/* ====================================================== */

// Data
// --------

import booksReducer, { MODULE_NAME as books } from './books/book_module'
import userReducer, { MODULE_NAME as user } from './user/user_module'

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

const rootReducer = (state: any, action: AnyAction) => 
    appReducer(state, action)


export default rootReducer