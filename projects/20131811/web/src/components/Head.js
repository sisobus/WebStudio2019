import React, { Component } from 'react';


class Head extends Component {

  render() {
    return (
      <div>
        <br />
        <div>
          <div className='header'>
            <img src='http://localhost:5000/api/download?filename=logo.png' height='130px' />
            &nbsp;REVIEW
        </div>
        </div>
      </div>
    );
  }
}

export default Head;
