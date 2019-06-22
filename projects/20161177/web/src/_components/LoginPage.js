import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { history } from './History';
import './LoginPage.css';
import { login } from "../authentication"


class Loginform extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        if (values.email && values.password) {
          const handleResponse = response => {
            return response.text().then(text => {
              const data = text && JSON.parse(text)
              if (!response.ok) {
                if (response.status === 401) {
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
              'email': values.email,
              'password': values.password
            })
          }

          fetch('http://0.0.0.0:5003/api/auth/login', requestOptions)
            .then(handleResponse)
            .then(response => {
              message.success(response.message);
              console.log(response);
              const { data } = response
              login({
                user: { id: data.id, email: data.email },
                token: data.token,
                refreshToken: data.refresh
              })
              history.push('/main')
            })
            .catch(error => {
              message.error(error);
            });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="asdf">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="./resist">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Loginform);

export default WrappedNormalLoginForm