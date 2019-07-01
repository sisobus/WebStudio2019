import React from 'react';
import Mainheader from '../Mainheader'
import Mainfooter from '../Mainfooter'
import './PageVisual.css'
import Visualsider from './Visualsider'

const PageVisual = () => {
    return(
        <div>
            <div className="main-wrapper">
          		<div className="main-container">
            		<Mainheader />
                    <div>
                        <Visualsider/>
                    </div>
            		<Mainfooter />
            	</div>
            </div>
        </div>
    )
}

export default PageVisual;