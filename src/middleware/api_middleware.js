import ClientApi from '../api/api'

/* ====================================================== */
/*                        Middleware                      */
/* ====================================================== */

const apiMiddleware = ({ getState, dispatch }) => next => action => {
  const { type, callAPI, shouldCallAPI = () => true, meta = {} } = action

  // Normal action: pass it on
  if (!callAPI) return next(action)

  if (!type.REQUEST || !type.SUCCESS || !type.FAILURE || !type.ALWAYS) {
    throw new Error('Expected action type created with apiAction(...)')
  }
  if (typeof callAPI !== 'function') {
    throw new Error('Expected callAPI to be a function.')
  }
  if (typeof shouldCallAPI !== 'function') {
    throw new Error('Expected shouldCallAPI to be a function.')
  }

  if (!shouldCallAPI(getState())) return

  next(requestAction({ type: type.REQUEST, meta }))

  return callAPI({
    api: ClientApi,
    dispatch
  })
    .then(response => {
      console.log('>>>>>Call api', response)
      next(successAction({ type: type.SUCCESS, response, meta }))
      next(alwaysAction({ type: type.ALWAYS, meta: { ...meta, ..._extractResponseMetadata(response) } }))
      return response
    })
    .catch(err => {
      // If it's an error from Firebase returned by Axios
      if (err.code) {
        next(firebaseFailure({ type: type.FAILURE, err, meta }))
        next(
          alwaysAction({
            type: type.ALWAYS,
            meta: { ...meta, isFirebaseError: true }
          })
        )
      } else {
        // It's a Runtime error of our client side code
        next(runtimeFailureAction({ type: type.FAILURE, err, meta }))
        next(alwaysAction({ type: type.ALWAYS, meta: { ...meta, isFirebaseError: false } }))
        throw err
      }
    })
}

export default apiMiddleware

/* ====================================================== */
/*                         Helpers                        */
/* ====================================================== */

export function requestAction({ type, meta }) {
  return { type, meta }
}

export function successAction({ type, response, meta }) {
  return {
    type,
    payload: response.data,
    meta: { ..._extractResponseMetadata(response), ...meta }
  }
}

export function firebaseFailure({ type, err, meta }) {
  return {
    type,
    error: true,
    payload: err.message,
    meta: { ...meta, isDeveloperError: false, ..._extractResponseMetadata(err) }
  }
}

export function runtimeFailureAction({ type, err, meta }) {
  return {
    type,
    error: true,
    payload: { type: err.name, message: err.message, stack: err.stack },
    meta: { ...meta, isDeveloperError: true }
  }
}

export function alwaysAction({ type, meta }) {
  return { type, meta }
}

function _extractResponseMetadata({ code, details }) {
  return { code, details }
}
