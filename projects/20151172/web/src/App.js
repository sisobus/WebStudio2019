import React from 'react';
import './App.css';
import Mainpage from './_components/Main'
import Aboutpage from './_components/About'
import Workpage from './_components/Work'
import Contactpage from './_components/Contact'
import { BrowserRouter as Router, Route } from "react-router-dom"
import DarkModeToggle from './DarkModeToggle';
import DarkModeCommands from './DarkModeCommands';

function App() {
	return (
		<>
		<div className = "wrapper">
			<div className = "nav">
				<DarkModeToggle />
			</div>
			<header id = "header">
				<div className = "content">
					<div className = "inner">
						<h1> PORTFOLIO </h1>
						<p><DarkModeCommands /></p>
						<p> I want "no pain yes gain" </p>
					</div>
				</div>
			</header>
			<Router>
				<Route path="/" exact component={Mainpage} />
				<Route path="/about" exact component={Aboutpage} />
				<Route path="/work" exact component={Workpage} />
				<Route path="/contact" exact component={Contactpage} />
			</Router>
		
			<footer id = "footer">
				<p class = "copyright">Copyright &copy; 2019 Joonho Hyun All rights reserved</p>
			</footer>
		</div>
		</>
	);
}

export default App;
