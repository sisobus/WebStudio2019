import React from 'react';
import './App.css';


import MainPage from './_components/Main';
import Upload from './_components/Upload';
import Request_Enroll from './_components/Request_Enroll';
import { BrowserRouter as Router, Route } from "react-router-dom";
/*import Articles from './Articles';
import Users from './Users';*/


function App() {
	return (
		<div id="App">
			<Router>
				<Route path = "/" exact component = { MainPage } />
				<Route path = "/Upload" component = { Upload } />
				<Route path = "/Request-Enroll" component=  { Request_Enroll } /> 
			</Router>
		</div>
	)
}

export default App;
