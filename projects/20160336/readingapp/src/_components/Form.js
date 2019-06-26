import React, { Component } from 'react';

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
          placeholder="id"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          placeholder="pw"
          value={this.state.Password}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default Form;