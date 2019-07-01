import React from 'react';
import Mainheader from '../Mainheader'
import Interviewsider from './Interviewsider'
import Mainfooter from '../Mainfooter'
//import Interviewcontent from './Interviewcontent'
import BLSGsider from './BLSGsider'
import './BLSG.css'


const BLSG = () => {
    return(
        <div>
            <div className="main-wrapper">
          		<div className="main-container">
            		<Mainheader />
                    <BLSGsider/>
            		<Mainfooter />
            	</div>
            </div>
        </div>
    )
}

export default BLSG;