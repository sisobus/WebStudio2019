import React from 'react'
import './Nav.css'

class Nav extends React.Component {
  render() {
    return (
      <div className="navbar-wrapper">
        <div className="navbar-container">
          <p id="logo">Movie Score</p>
        </div>
      </div>
    )
  }
}

export default Nav
