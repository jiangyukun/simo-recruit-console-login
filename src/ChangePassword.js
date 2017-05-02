/**
 * Created by jiangyukun on 2017/5/2.
 */
import React from 'react'
import PropTypes from 'prop-types'

import {Modal, Header, Body, Footer} from 'app-core/modal/'
import {FlexDiv, Part, Line} from 'app-core/layout/'

class ChangePassword extends React.Component {
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
        <Header closeButton={true}>密码过于简单，请重置密码</Header>
        <Body>
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
                   value={this.state.newPassword} onChange={e => this.setState({newPassword: e.target.value}, this.checkValid)}/>
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
        </Body>
        <Footer>
          <button className="btn" disabled={!this.state.valid} onClick={this.changePassword}>确定</button>
        </Footer>
      </Modal>
    )
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func,
  onExited: PropTypes.func
}

export default ChangePassword
