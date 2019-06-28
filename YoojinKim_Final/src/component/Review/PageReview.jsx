import React from 'react';
import Mainheader from '../Mainheader'
import Mainfooter from '../Mainfooter'
import './PageReview.css'
import ReviewSider from './ReviewSider'

const PageReview = () => {
    return(
        <div>
            <div className="main-wrapper">
          		<div className="main-container">
            		<Mainheader />
                    <div>
                        <ReviewSider/>
                    </div>
            		<Mainfooter />
            	</div>
            </div>
        </div>
    )
}

export default PageReview;