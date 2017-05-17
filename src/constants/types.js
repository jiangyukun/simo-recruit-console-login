export const USER_LOGIN = 'USER_LOGIN'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const CLEAR_LOGIN_FAILURE = 'CLEAR_LOGIN_FAILURE'
export const CLEAR_LOGIN_SUCCESS = 'CLEAR_LOGIN_SUCCESS'
export const CLEAR_CHANGE_PASSWORD = 'CLEAR_CHANGE_PASSWORD'

export const APP = {
  SHOW_MESSAGE: null,
  CHANGE_MESSAGE_STATUS: null,
}

function getActionTypeFn(prefix) {
  return function (type) {
    return prefix + '__' + type
  }
}

function generatorValueFromKey(prefix, obj) {
  let typeFn = getActionTypeFn(prefix)
  Object.keys(obj).forEach(key => obj[key] = typeFn(key))
}

generatorValueFromKey('APP', APP)
