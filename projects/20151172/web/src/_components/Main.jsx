import React from 'react';
import './Main.css'
import { Link } from "react-router-dom"

class Mainpage extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className = "main-wrapper">
					<div className = "Nav">
						<ul>
							<li><Link to="/about" className="link">About</Link></li>
							<li><Link to="/work" className="link" >Work</Link></li>
						</ul>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default Mainpage
