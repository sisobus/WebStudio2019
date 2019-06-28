import React, { Component } from 'react';
import {  Button } from 'antd';

class Form extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value,
      Password: e.target.value
    })
  }
  render() {
    return (
      <form>
          <input
            Icon type="user"
            placeholder="username"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            Icon type="lock"
            placeholder="password"
            value={this.state.Password}
            onChange={this.handleChange}
          />
          <Button type="primary" htmlType="submit">
              Log in
            </Button>
        </form>

    );
  }
}

export default Form;