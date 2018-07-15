import { combineReducers } from 'redux'

/* ====================================================== */
/*                    Custom Reducers                     */
/* ====================================================== */

// Metadata
// --------
import apiMetadataReducer, { MODULE_NAME as apiMetadata } from './api_metadata/api_metada_module'

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

const appReducer = combineReducers({
  // Data

  // Metadata
  [apiMetadata]: apiMetadataReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
