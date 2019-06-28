import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import classNames from 'classnames/bind'
import styles from './LoginForm.module.scss'
import { Link } from 'react-router-dom'
import { history } from './history'


const cx = classNames.bind(styles)

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      confirmDirty: false,
    }

    this.account = null
    this.password = null
    this.passwordCheck = null
    this.secretKey = null

    this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
  }

  changePage = () => {
    this.props.callbackFromParent();
  }


  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is in consistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['passwordCheck'], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form
        onSubmit={e => {
          e.preventDefault()
          this.props.form.validateFields(err => {
            if (!err) {
              const account = this.account.value
              const password = this.password.value
              console.log('account : ' + account + ' password : ' + password)
              const jsons = {
                'account': account,
                'password': password
              }
              const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsons)
              }
              fetch('http://localhost:5000/api/users', requestOptions)
                .then(response => response.json())
                .then(rsp => {
                  console.log(rsp)
                  if (rsp === 'success') {
                    this.changePage();
                    history.push('/login')
                  } else {
                    message.error('Account already exist')
                  }
                }
                )
            }
          })
        }}
        className={cx("login-form")}
      >
        <Form.Item style={{ margin: "0 0 10px 0" }}>
          {getFieldDecorator("account", {
            rules: [
              { required: true, message: "Please input your username!" }
            ]
          })(
            <Input
              name="account"
              prefix={<Icon type="user" />}
              placeholder="Account name"
              ref={node => {
                this.account = node.input
              }}
            />
          )}
        </Form.Item>
        <Form.Item style={{ margin: "0 0 10px 0" }}>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Please input your Password!" },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input
              name="password"
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
              ref={node => {
                this.password = node.input
              }}
            />
          )}
        </Form.Item>
        <Form.Item style={{ margin: "0 0 10px 0" }}>
          {getFieldDecorator("passwordCheck", {
            rules: [
              {
                required: true,
                message: "Two passwords that you enter is inconsistent!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input
              onBlur={this.handleConfirmBlur}
              name="passwordCheck"
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password Check"
              ref={node => {
                this.passwordCheck = node.input
              }}
            />
          )}
        </Form.Item>
        <Form.Item style={{ margin: "0 0 12px 0" }}>
          <Button
            type="primary"
            htmlType="submit"
            className={cx("login-button")}
          >
            Register
          </Button>
          <Link className={cx("signup-button")} to="/login" onClick={this.changePage}>
            Sign In
          </Link>
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(RegisterForm);
