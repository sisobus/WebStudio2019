import React from 'react';
import './App.css';
import Mainpage from './_components/Main'
import Aboutpage from './_components/About'
import Workpage from './_components/Work'
import { BrowserRouter as Router, Route } from "react-router-dom"

function App() {
	return (
		<div className = "wrapper">
			<header id = "header">
				<div className = "content">
					<div className = "inner">
						<h1> PORTFOLIO </h1>
						<p> I want "no pain yes gain" </p>
					</div>
				</div>
				<Router>
					<Route path="/" exact component={Mainpage} />
					<Route path="/about" exact component={Aboutpage} />
					<Route path="/work" exact component={Workpage} />
				</Router>
			</header>
			
			<footer id = "footer">
				<p class = "copyright">Copyright &copy; 2019 Joonho Hyun All rights reserved</p>
			</footer>
		</div>
		/*
		<div className="container">
			<h1>Hustle Life</h1>
			<input className="container_toggle" type="checkbox" id="switch" name="mode" />
			<label for="switch">Toggle</label>
		</div>
	
		<script>
			var checkbox = document.querySelector('input[name=mode]')
			
			checkbox.addEventListener('change', function() {
				if(this.checked) {
					trans()
					document.documentElement.setAttribute('data-theme', 'dark')
				} else {
					trans()
					document.documentElement.setAttribute('data-theme', 'light')
				}
			})

			let trans = () => {
				document.documentElement.classList.add('transition')
				window.setTimeout(() => {
					document.documentElement.classList.remove('transition')
				}, 1000)
			}
		</script>*/
	);
}

export default App;
