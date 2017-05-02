/**
 * Created by jiangyukun on 2017/4/10.
 */
import {fromJS} from 'immutable'
import * as types from '../constants/types'
import * as phase from '../constants/phase'

const initValue = {
  loginSuccess: false,
  failureMessage: '',
  changePasswordSuccess: false
}

export function _app(iState = fromJS(initValue), action) {

  let nextIState = iState
  switch (action.type) {
    case types.USER_LOGIN + phase.SUCCESS:
      nextIState = iState.set('loginSuccess', true)
      break

    case types.USER_LOGIN + phase.FAILURE:
      nextIState = iState.set('failureMessage', action.err)
      break

    case types.CLEAR_LOGIN_FAILURE:
      nextIState = iState.set('failureMessage', '')
      break

    case types.CLEAR_LOGIN_SUCCESS:
      nextIState = iState.set('loginSuccess', false)
      break

    case types.CHANGE_PASSWORD + phase.SUCCESS:
      nextIState = iState.set('changePasswordSuccess', true)
      break

    case types.CLEAR_CHANGE_PASSWORD:
      nextIState = iState.set('changePasswordSuccess', false)
      break
  }
  return nextIState

}
