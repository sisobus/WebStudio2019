import React from 'react';
import './About.css';
import { Link } from "react-router-dom"
import { Icon } from 'antd'

class Aboutpage extends React.Component {
	render() {
		return (
			<div className = "about">
				<div className = "back">
					<Link to = "/" className = "link">
					<Icon type="left-circle" className="home" />
					</Link>
				</div>
				<h1>this is me</h1>
				<p>I do what i wanna do</p>
				<p>Adobe Photoshop/Adobe Premiere Pro/Adobe After Effects</p>				
			</div>
		)
	}
}

export default Aboutpage
