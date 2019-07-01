import React from 'react';
import './HomeContent.css';
import OpenImage from './HomeImage.svg'
import Thumbnail from '../Interview/Thumbnail'

class HomeContent extends React.Component{
	  render() {
    return (
      <div className="home-container">
          <div className="openimage-container">
            <img src={OpenImage} />
          </div>
          <div className="content-container">
          	<Thumbnail/>
          </div>
      </div>
  )
}
}

export default HomeContent