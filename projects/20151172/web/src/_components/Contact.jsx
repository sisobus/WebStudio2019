import React from 'react';
import './Contact.css';
import { Link } from "react-router-dom"
import { Icon } from 'antd'

class Contactpage extends React.Component {
	render() {
		return (
			<div className = "contact">
				<div className = "back">
					<Link to = "/" className = "link">
						<Icon type="left-circle" className="home" />
					</Link>
				</div>
				<h1>Contact</h1>
				<h2>Instagram</h2>
				<Icon type="instagram" className="insta" />
			</div>
		)
	}
}

export default Contactpage
