/**
 * Created by jiangyukun on 2017/4/10.
 */
import {fromJS} from 'immutable'
import {combineReducers} from 'redux'

import {_app} from './app.reducer'

/**
 * 使用immutable，将reducer的state封装为iState，不可变数据
 * @param reducerFun 原reducer函数
 * @return 封装后的reducer函数
 */
const wrapReducerState = reducerFun => (state, action) => {
  const iState = fromJS(state)
  return unwrapReducerState(state, iState, reducerFun(iState, action))
}

function unwrapReducerState(state, iState, nextIState) {
  if (iState === nextIState) {
    return state
  }
  return nextIState.toJS()
}


export default combineReducers({
  _app: wrapReducerState(_app)
})
