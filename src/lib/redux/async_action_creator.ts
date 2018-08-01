/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

export const ASYNC_ACTION_SEPARATOR = '--->'

export const ASYNC_ACTION_ID = 'ASYNC'

export interface AsyncActionNames {
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string,
  ALWAYS: string,
  NAME: string
}

function asyncActionObject(type: string): AsyncActionNames {
  return {
    REQUEST: `${type}${ASYNC_ACTION_SEPARATOR}REQUEST`,
    SUCCESS: `${type}${ASYNC_ACTION_SEPARATOR}SUCCESS`,
    FAILURE: `${type}${ASYNC_ACTION_SEPARATOR}FAILURE`,
    ALWAYS: `${type}${ASYNC_ACTION_SEPARATOR}ALWAYS`,
    NAME: type
  }
}

function asyncAction(type: string): string {
  return `${ASYNC_ACTION_ID}_${type}`
}

export {
  asyncAction,
  asyncActionObject
}
