/**
 * Created by jiangyukun on 2017/4/6.
 */
import React, {PropTypes, Component} from 'react'
import {Provider} from 'react-redux'

import Login from './Login'

class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Login/>
      </Provider>
    )
  }
}

Root.propTypes = {}

export default Root
