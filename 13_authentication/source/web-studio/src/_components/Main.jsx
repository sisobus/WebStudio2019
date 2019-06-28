import React from 'react'
import './Main.css'
import Nav from './Nav'
import Articles from './Articles'
import { Button, message } from 'antd'
import { Link } from "react-router-dom"

class MainPage extends React.Component {
  componentDidMount() {
    const handleResponse = response => {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            return Promise.reject(response)
          }
          const error = (data && data.message) || response.statusText
          return Promise.reject(error)
        }

        return data
      })
    }
    const token = localStorage.getItem('access_token')
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }
    fetch('http://0.0.0.0:5000/api/private/routes', requestOptions)
      .then(handleResponse)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        message.error(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Nav />
        <Link to="/blank">
          <Button type="primary">Go to Blank</Button>
        </Link>
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
