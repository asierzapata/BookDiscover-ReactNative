/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

export const API_ACTION_SEPARATOR = '--->'

export interface ApiActionNames {
  REQUEST?: string,
  SUCCESS?: string,
  FAILURE?: string,
  ALWAYS?: string,
  NAME: string
}

function apiAction(type: string): ApiActionNames {
  return {
    REQUEST: `${type}${API_ACTION_SEPARATOR}REQUEST`,
    SUCCESS: `${type}${API_ACTION_SEPARATOR}SUCCESS`,
    FAILURE: `${type}${API_ACTION_SEPARATOR}FAILURE`,
    ALWAYS: `${type}${API_ACTION_SEPARATOR}ALWAYS`,
    NAME: type
  }
}

export default apiAction
