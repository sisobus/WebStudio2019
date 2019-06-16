import React from 'react';
import { Button } from 'antd';
import './App.css';
import Sider from './Sider'

function App() {
	return(
		<div className="App">
			<div className="sider">
				<Sider />
			</div>
		<div className="main-container">
			<Button type="primary">Primary</Button>
		</div></div>
	)
}
export default App;
