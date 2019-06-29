import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { Link } from 'react-router-dom'
import { history } from './history'
import { login, logout } from "../authentication"
import * as util from '../util'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    logout()
    this.name = null
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
              const name = this.name.value
              const password = this.password.value
              if (name && password) {
                const requestOptions = {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: name,
                    password: password
                  })
                }
                fetch('http://54.180.147.246:8080/user/login', requestOptions)
                  .then(util.handleResponse)
                  .then(response => {
                    response = JSON.parse(response)
                    message.success(response.message)
                    const { data } = response
                    login({
                      user: { id: data.id, name: data.name },
                      token: data.token,
                      refreshToken: data.refresh
                    })
                    history.push('/')
                  })
                  .catch(error => {
                    message.error(error);
                  })
              }
            }
          })
        }}
        className="login-form"
      >
        <Form.Item style={{ margin: "0 0 10px 0" }}>
          {getFieldDecorator("name", {
            rules: [
              { required: true, message: "Please input your username!" }
            ]
          })(
            <Input
              name="name"
              prefix={<Icon type="user" />}
              placeholder="user name"
              ref={node => {
                this.name = node.input
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
          })(<Checkbox className="remember">Remember me</Checkbox>)}
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "0" }}
            className="login-button"
          >
            Log in
          </Button>
          <Link className="signup-button" to="/register">
            Sign up
          </Link>
        </Form.Item>
      </Form>
    )
  }
}

export { LoginForm }
