import React from 'react'
import { Button } from 'antd'
import { Link } from "react-router-dom"
import {history } from './history'
import Nav from './Nav'

class BlankPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <h1>Blank Page!!</h1>
        <Link to="/">
          <Button type="error">Go to MainPage</Button>
        </Link>
        <Button type="error">
          <Link to="/">Go to MainPage</Link>
        </Button>
        <Button type="error" onClick={() => history.push('/')}>
          Go to MainPage
        </Button>
      </React.Fragment>
    )
  }
}

export default BlankPage
