import React from 'react'
import './Nav.css'
import { Link } from "react-router-dom"

class Nav extends React.Component {
  render() {
    const {currentPath} = this.props

    return (
      <div className="navbar-wrapper">
        <div className="navbar-container">
          {currentPath==='/'
          &&
          (<Link to='/main'>
            <p id="logo">Look Morning</p>
          </Link>)}

        {currentPath==='/main'
          &&
          (<Link to='/'>
            <p id="logo">Look Morning</p>
          </Link>)}
        </div>
      </div>
    )
  }
}

export default Nav
