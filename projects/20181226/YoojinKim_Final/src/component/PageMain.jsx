import React from 'react'
import './PageMain.css'
import PageHome from './Home/PageHome'
//import Interview_Page from './Interview_Page'

class PageMain extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-wrapper">
          <div className="main-container">
            <PageHome />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default PageMain