import { Form, Input, Tooltip, Icon, Checkbox, Button } from 'antd';
import React from 'react';
import './Resister.css';
import UserForm from './UserForm';

//let requestOptions;
  
class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      email: '',
      password: '',
      nickname: ''
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          console.log(values.email);
          console.log(values.password);
          console.log(values.nickname);

          fetch('http://0.0.0.0:5002/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            'email': values.email,
            'password': values.password,
            'nickname': values.nickname
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
      });
        }
      });
    };
  
    handleConfirmBlur = e => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

    handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
    }

   /*requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        nickname: this.state.nickname
      })
    }*/
 
  
    render() {
      const { getFieldDecorator } = this.props.form;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
  
  
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
              /*
              value: (e) => this.state.email,
              onChange: (e) => this.handleChange,
              name: "email"
              */
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
              /*
              value: (e) => this.state.email,
              onChange: (e) => this.handleChange,
              name: "password"
              */
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              /*
              value: (e) => this.state.email,
              onChange: (e) => this.handleChange,
              name: "nickname"
              */
            })(<Input />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                I have read the <a href="as">agreement</a>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" >
              Register
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }

  /*
function fetchUser(values) {

  console.log(this.values.email);
      fetch('https://0.0.0.0:5002/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.values.email,
          password: this.values.password,
          nickname: this.values.nickname
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
      });
  }
  */
 
  const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
  
  export default WrappedRegistrationForm