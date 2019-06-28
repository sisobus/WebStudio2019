import React from 'react';
import Mainheader from '../Mainheader'
import Mainfooter from '../Mainfooter'
import './PageLike.css'
import LikeSider from './LikeSider'

const PageLike = () => {
    return(
        <div>
            <div className="main-wrapper">
          		<div className="main-container">
            		<Mainheader />
                    <div>
                        <LikeSider/>
                    </div>
            		<Mainfooter />
            	</div>
            </div>
        </div>
    )
}

export default PageLike;