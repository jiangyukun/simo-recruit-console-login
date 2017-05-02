/**
 * Created by jiangyukun on 2017/4/10.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import md5 from 'md5'

import ChangePassword from './ChangePassword'

import {login, clearFailureMessage, clearLoginSuccess, changePassword, clearChangePassword} from './actions/app.action'

class App extends Component {
  state = {
    email: '',
    password: '',
    showChangePwd: false
  }

  handleEmailChange = e => {
    this.setState({email: e.target.value})
  }

  handlePasswordChange = e => {
    this.setState({password: e.target.value})
  }

  login = e => {
    this.props.login(this.state.email, md5(this.state.password).toUpperCase())
    e.preventDefault()
  }

  componentDidUpdate() {
    if (this.props.loginSuccess) {
      this.props.clearLoginSuccess()
      if (this.state.password == '123456') {
        this.setState({showChangePwd: true})
      } else {
        location.href = '../simo-recruit-console/index'
      }
    }
    if (this.props.failureMessage) {
      this.props.clearFailureMessage()
      alert(this.props.failureMessage)
    }
    if (this.props.changePasswordSuccess) {
      this.props.clearChangePassword()
    }
  }

  render() {
    return (
      <div className="app">
        {
          this.state.showChangePwd && (
            <ChangePassword
              changePassword={this.props.changePassword}
              changePasswordSuccess={this.props.changePasswordSuccess}
              onExited={() => this.setState({showChangePwd: false})}/>
          )
        }
        <div className="app-container">
          <h1 className="app-name">思默招募登录</h1>
          <form className="login-form" autoComplete="false">
            <div className="list-group">
              <div className="list-group-item">
                <input placeholder="邮箱" className="form-control" value={this.state.email} onInput={this.handleEmailChange}/>
              </div>
              <div className="list-group-item">
                <input placeholder="密码" className="form-control" value={this.state.password} onInput={this.handlePasswordChange}
                       type="password"/>
              </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={this.login} disabled={!this.state.email || !this.state.password}>登录</button>
          </form>
          <div>
            <p className="copyright">杭州望吉健康科技 &copy; 2017</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const app = state['_app']
  return {
    ...app
  }
}

export default connect(mapStateToProps, {login, clearFailureMessage, clearLoginSuccess, changePassword, clearChangePassword})(App)
