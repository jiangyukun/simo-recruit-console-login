/**
 * Created by jiangyukun on 2017/4/10.
 */
import {fromJS, Map} from 'immutable'
import {MESSAGE_TYPE, MESSAGE_STATUS} from 'app-core/message'
import * as types from '../constants/types'
import {APP} from '../constants/types'
import * as phase from '../constants/phase'

const initValue = {
  loginSuccess: false,
  failureMessage: '',
  changePasswordSuccess: false,
  msgQueue: []
}
let uid = 1

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

    case APP.SHOW_MESSAGE:
      nextIState = nextIState.update('msgQueue', msgQueue => msgQueue.push(Map(_handleMessage(action.message))))
      break

    case APP.CHANGE_MESSAGE_STATUS:
      nextIState = _updateMsgQueue(nextIState, action.msgId, msg => msg.set('status', action.newStatus))
      break

  }

  if (action.type.indexOf(phase.FAILURE) != -1) {
    nextIState = nextIState.update('msgQueue', msgQueue => msgQueue.push(Map({
      id: uid++,
      status: MESSAGE_STATUS.TO_SHOW,
      content: action.err,
      msgType: MESSAGE_TYPE.FAILURE,
      timeout: 3000
    })))
  }

  return nextIState

  // - - - - - - -  --  - - - - - -- - -

  function _handleMessage(message) {
    let id = message.id
    let timeout = message.timeout
    if (!id) {
      id = '__auto_id__' + uid++
    }
    if (typeof timeout != 'number') {
      timeout = 3000
    }
    return {
      ...message,
      id,
      timeout,
      status: MESSAGE_STATUS.TO_SHOW,
    }
  }


  function _updateMsgQueue(curIState, msgId, callback) {
    let msgQueue = curIState.get('msgQueue')
    const match = msgQueue.find(msg => msg.get('id') == msgId)
    if (!match) {
      console.log('not match')
      return curIState
    }
    msgQueue = msgQueue.update(msgQueue.indexOf(match), msg => callback(msg))
    return curIState.set('msgQueue', msgQueue)
  }

}
