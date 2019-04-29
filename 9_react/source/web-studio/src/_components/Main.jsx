import React from 'react'
import './Main.css'
import Nav from './Nav'
import Articles from './Articles'

class MainPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <div className="main-wrapper">
          <div className="main-container">
            <Articles />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default MainPage
