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
				<h1>This is me</h1>
				<p>I do what i wanna do</p>
				<h2>Tool I can use</h2> 
				<p>Adobe Photoshop/Adobe Premiere Pro/Adobe After Effects</p>
				<h2>Work I mainly do</h2>
				<p>Graphic Design/Contents Planning/Film Making/Illustration</p>
			</div>
		)
	}
}

export default Aboutpage
