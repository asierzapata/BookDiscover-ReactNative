/* global IS_PRODUCTION */

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import apiMiddleware from '../middleware/api_middleware'


import rootReducer from './root_reducer'

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

function startStore() {
  const initialState = {}
  const middleware = [
    apiMiddleware,
    apiMiddleware,
    createLogger()
  ]

  const middlewareStack = applyMiddleware(...middleware)

  const store = createStore(
    rootReducer,
    initialState,
    middlewareStack
  )
  return {
    store,
  }
}

const { store } = startStore()

export { store as reduxStore }

export default startStore
