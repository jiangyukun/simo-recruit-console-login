/**
 * Created by jiangyukun on 2017/4/6.
 */
import React, {Component} from 'react'
import {Provider} from 'react-redux'

import App from './App'

class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <App/>
      </Provider>
    )
  }
}

Root.propTypes = {}

export default Root
