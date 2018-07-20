import { combineReducers, AnyAction } from 'redux'

/* ====================================================== */
/*                    Custom Reducers                     */
/* ====================================================== */

// Metadata
// --------
import apiMetadataReducer, { MODULE_NAME as apiMetadata } from './api_metadata/api_metadata_module'

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

const appReducer = combineReducers({
    // Data

    // Metadata
    [apiMetadata]: apiMetadataReducer
})

const rootReducer = (state: any, action: AnyAction) => 
    appReducer(state, action)


export default rootReducer