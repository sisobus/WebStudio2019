import React from 'react';
import Mainheader from '../Mainheader'
import Interviewsider from './Interviewsider'
import Mainfooter from '../Mainfooter'
//import Interviewcontent from './Interviewcontent'
import BWRsider from './BWRsider'
import './BenchWeReo.css'


const BenchWeReo = () => {
    return(
        <div>
            <div className="main-wrapper">
          		<div className="main-container">
            		<Mainheader />
                    <BWRsider/>
            		<Mainfooter />
            	</div>
            </div>
        </div>
    )
}

export default BenchWeReo;