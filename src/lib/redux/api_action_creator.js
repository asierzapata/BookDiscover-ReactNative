/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

export const API_ACTION_SEPARATOR = '--->'

function apiAction(type) {
  if (!(typeof type === 'string')) {
    throw new Error('Expected an array of three string types.')
  }

  return {
    REQUEST: `${type}${API_ACTION_SEPARATOR}REQUEST`,
    SUCCESS: `${type}${API_ACTION_SEPARATOR}SUCCESS`,
    FAILURE: `${type}${API_ACTION_SEPARATOR}FAILURE`,
    ALWAYS: `${type}${API_ACTION_SEPARATOR}ALWAYS`,
    NAME: type
  }
}

export default apiAction
