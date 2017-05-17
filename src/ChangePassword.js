/**
 * Created by jiangyukun on 2017/5/2.
 */
import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'app-core/modal/'
import {MESSAGE_TYPE} from 'app-core/message/'
import {FlexDiv, Part, Line} from 'app-core/layout/'

class ChangePassword extends React.Component {
  exceedTip = false
  state = {
    show: true,
    valid: false,

    oldPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  }

  close = () => {
    this.setState({show: false})
  }

  handlePasswordChange = (e) => {
    let newPassword = e.target.value
    if (newPassword.length >= 20) {
      newPassword = newPassword.substring(0, 20)
      if (!this.exceedTip) {
        this.exceedTip = true
        this.props.showMessage({msgType: MESSAGE_TYPE.WARNING, content: '密码不能超过20个字符！'})
      }
    } else {
      this.exceedTip = false
    }
    this.setState({newPassword})
  }

  checkValid = () => {
    let valid = true
    const {oldPassword, newPassword, repeatNewPassword} = this.state

    if (oldPassword.length < 6 || newPassword.length < 6 || repeatNewPassword.length < 6) valid = false
    if (newPassword != repeatNewPassword) valid = false
    if (newPassword == '123456') valid = false

    if (valid != this.state.valid) {
      this.setState({valid})
    }
  }

  changePassword = () => {
    this.props.changePassword(this.state.oldPassword, this.state.newPassword)
  }

  componentDidUpdate() {
    if (this.props.changePasswordSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>密码过于简单，请重置密码</Modal.Header>
        <Modal.Body>
          <FlexDiv>
            <Part>原密码：</Part>
            <Part>
              <input className="input" placeholder="请输入原密码" type="password"
                     value={this.state.oldPassword} onChange={e => this.setState({oldPassword: e.target.value}, this.checkValid)}/>
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part>新密码：</Part>
            <Part>
              <input className="input" placeholder="请输入新密码" type="password"
                     value={this.state.newPassword} onChange={this.handlePasswordChange}/>
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part>重复新密码：</Part>
            <Part>
              <input className="input" placeholder="请输入新密码" type="password"
                     value={this.state.repeatNewPassword} onChange={e => this.setState({repeatNewPassword: e.target.value}, this.checkValid)}/>
            </Part>
          </FlexDiv>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" disabled={!this.state.valid} onClick={this.changePassword}>确定</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func,
  showMessage: PropTypes.func,
  onExited: PropTypes.func
}

export default ChangePassword
