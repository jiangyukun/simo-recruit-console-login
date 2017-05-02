/**
 * Created by jiangyukun on 2017/2/14.
 */
import md5 from 'md5'

import {_get} from '../service/http'
import * as types from '../constants/types'
import {THREE_PHASE} from '../middleware/request_3_phase'

export function login(name, pswd) {
  return {
    [THREE_PHASE]: {
      type: types.USER_LOGIN,
      http: () => _get(`/backend/user/v1/login/${name}/${pswd}`)
    }
  }
}

export function changePassword(password, newPassword) {
  newPassword = md5(newPassword).toUpperCase()
  return {
    [THREE_PHASE]: {
      type: types.CHANGE_PASSWORD,
      http: () => _get(`/backend/user/v1/updatePassword/${newPassword}`)
    }
  }
}

export function clearFailureMessage() {
  return {
    type: types.CLEAR_LOGIN_FAILURE
  }
}

export function clearLoginSuccess() {
  return {
    type: types.CLEAR_LOGIN_SUCCESS
  }
}

export function clearChangePassword() {
  return {
    type: types.CLEAR_CHANGE_PASSWORD
  }
}
