import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { Link } from 'react-router-dom'
import { history } from './history'
import { login, logout } from "../authentication"
import classNames from 'classnames/bind'
import styles from './LoginForm.module.scss'

const cx = classNames.bind(styles)

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    logout()
    this.email = null
    this.password = null
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
              if (account && password) {
                const handleResponse = response => {
                  return response.text().then(text => {
                    const data = text && JSON.parse(text)
                    if (!response.ok) {
                      if (response.status === 401) {
                        // auto logout if 401 response returned from api
                        return Promise.reject(response)
                      }
                      const error = (data && data.message) || response.statusText
                      return Promise.reject(error)
                    }
            
                    return data
                  })
                }
                const requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    account: account,
                    password: password
                  })
                }
                fetch('http://0.0.0.0:5000/api/auth/login', requestOptions)
                  .then(handleResponse)
                  .then(response => {
                    message.success(response.message);
                    console.log(response);
                    const { data } = response
                    login({
                      user: { id: data.id, account: data.account },
                      token: data.token,
                      refreshToken: data.refresh
                    })
                    history.push('/')
                  })
                  .catch(error => {
                    message.error(error);
                  });
              }
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
              prefix={<Icon type="mail" />}
              placeholder="account"
              ref={node => {
                this.account = node.input
              }}
            />
          )}
        </Form.Item>
        <Form.Item style={{ margin: "0 0 10px 0" }}>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Please input your Password!" }
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
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox className={cx("remember")}>Remember me</Checkbox>)}
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "0" }}
            className={cx("login-button")}
          >
            Log in
          </Button>
          <Link className={cx("signup-button")} to="/register">
            Sign up
          </Link>
        </Form.Item>
      </Form>
    )
  }
}

export { LoginForm }
