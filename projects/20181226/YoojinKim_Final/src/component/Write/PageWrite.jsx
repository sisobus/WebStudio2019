import React from 'react';
import Mainheader from '../Mainheader'
import Mainfooter from '../Mainfooter'
import './PageWrite.css'
import WriteContent from './WriteContent'

const PageWrite = () => {
    return(
        <div>
            <div className="main-wrapper">
          		<div className="main-container">
            		<Mainheader />
                    <div>
                        <WriteContent/>
                    </div>
            		<Mainfooter />
            	</div>
            </div>
        </div>
    )
}

export default PageWrite;