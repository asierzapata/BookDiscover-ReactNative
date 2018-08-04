import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import apiMiddleware from '../middleware/api_middleware'

import { MODULE_NAME as apiMetadataModuleName } from './api_metadata/api_metadata_module'

import rootReducer from './root_reducer'

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

function startStore() {
	const initialState = {}
	const middleware = [
		apiMiddleware
		//createLogger()
	]

	const persistConfig = { key: 'root', storage, blacklist: [apiMetadataModuleName] }

	const persistedReducer = persistReducer(persistConfig, rootReducer)

	const middlewareStack = applyMiddleware(...middleware)
	const windowIfDefined = typeof window === 'undefined' ? null : (window as any)

	const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

	const store = createStore(persistedReducer, initialState, composeEnhancers(middlewareStack))
	let persistor = persistStore(store)
	return {
		persistor,
		store
	}
}

const { store, persistor } = startStore()

export { store as reduxStore, persistor }

export default startStore
