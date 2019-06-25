import React from 'react'
import './Main.css'
import Nav from './Nav'
import Articles from './Articles'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import Form from './Form'
class MainPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <Link to Blank>
	  <Button type="primary">Watching Movies Here</Button></Link>
        <div className="main-wrapper">
          <Form/>
          <div className="main-container">
            <Articles />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default MainPage