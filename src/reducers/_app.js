/**
 * Created by jiangyukun on 2017/4/10.
 */
import {fromJS, Map} from 'immutable'
import * as types from '../constants/types'
import * as phase from '../constants/phase'

let errId = 1

const initValue = {
  loginSuccess: false,
  failureMessage: '',
  errQueue: [],
}

export function _app(state = initValue, action) {
  const iState = fromJS(state)
  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {
      case types.USER_LOGIN + phase.FAILURE:
        nextIState = iState.set('failureMessage', action.err)
        break

      case types.CLEAR_LOGIN_FAILURE:
        nextIState = iState.set('failureMessage', '')
        break
    }

    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

}
