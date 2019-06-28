import React from 'react';
import Mainheader from '../Mainheader'
import Mainfooter from '../Mainfooter'
import './PageHome.css'
import HomeContent from './HomeContent'

const PageHome = () => {
    return(
        <div>
            <div className="main-wrapper">
          		<div className="main-container">
            		<Mainheader />
                    <div>
                        <HomeContent/>
                    </div>
            		<Mainfooter />
            	</div>
            </div>
        </div>
    )
}

export default PageHome;