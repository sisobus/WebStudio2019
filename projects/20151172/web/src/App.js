import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"

function App() {
	return (
		<div className="container">
			<h1>Hustle Life</h1>
			<input className="container_toggle" type="checkbox" id="switch" name="mode" />
			<label for="switch">Toggle</label>
		</div>
	/*
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
