import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";

import apiMiddleware from "../middleware/api_middleware";

import rootReducer from "./root_reducer";

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

function startStore() {
  const initialState = {};
  const middleware = [
    apiMiddleware
    //createLogger()
  ];

  const middlewareStack = applyMiddleware(...middleware);
  const windowIfDefined =
    typeof window === "undefined" ? null : (window as any);

  const composeEnhancers =
    windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(middlewareStack)
  );
  return {
    store
  };
}

const { store } = startStore();

export { store as reduxStore };

export default startStore;
