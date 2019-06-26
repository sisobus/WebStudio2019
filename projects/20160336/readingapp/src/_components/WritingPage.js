import React, { Component } from 'react';
import { Button, Input } from 'antd';

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
        <div>
          <input
            placeholder="id"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            placeholder="pw"
            value={this.state.Password}
            onChange={this.handleChange}
          />
          <Button type="primary" htmlType="submit">
              Log in
            </Button>
        </div>
        </form>

    );
  }
}

export default WritingPage;