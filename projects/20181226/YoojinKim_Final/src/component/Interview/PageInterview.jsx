import React from 'react';
import Mainheader from '../Mainheader'
import Interviewsider from './Interviewsider'
import Mainfooter from '../Mainfooter'
import Interviewcontent from './Interviewcontent'
import './PageInterview.css'

const PageInterview = () => {
    return(
        <div>
            <div className="main-wrapper">
          		<div className="main-container">
            		<Mainheader />
            		<Interviewsider />
            		<Mainfooter />
            	</div>
            </div>
        </div>
    )
}

export default PageInterview;