import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { history } from './history'
import { Link } from 'react-router-dom'
import { logout } from "../authentication"
import * as util from '../util'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      confirmDirty: false,
    }

    logout()
    this.name = null
    this.password = null
    this.passwordCheck = null
    this.secretKey = null

    this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
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
                fetch('http://54.180.147.246:8080/users', requestOptions)
                  .then(util.handleResponse)
                  .then(response => {
                    message.success(response.message)
                    history.push('/')
                  })
                  .catch(error => {
                    alert(error)
                    history.push('/register')
                  })
              }
            }
          })
        }}
        className="login-form"
      >
        <Form.Item style={{ margin: "0 0 10px 0" }}>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input your user name!" }]
          })(
            <Input
              name="name"
              prefix={
                <Icon type="user" />
              }
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
            className="login-button"
          >
            Register
          </Button>
          <Link className="signup-button" to="/login">
            Sign In
          </Link>
        </Form.Item>
      </Form>
    )
  }
}

export { RegisterForm }
