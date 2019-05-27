import React from 'react';
import './App.css';
import UpperMenu from "./UpperMenu";
import PicturesWall from "./PicturesWall";
import EditableTagGroup from "./EditableTagGroup";
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

function App() {
	return (
		<div id="App">
			<Layout className="layout">
				<Header>
					<div className="UpperMenu">
						<UpperMenu/>
					</div>
				</Header>

				<Content style={{ padding: '0 50px' }}>
					<h1 className="introduction text uppercase center">
						Smile Archive
					</h1>
					<h2 className= "text center capitalize">
						Hello, this is my <strong>Smile Archive</strong> site!
					</h2>
					<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
					Content
					</div>
					<div className="PicturesWall">
						<PicturesWall/>
					</div>
					<div className="EditableTagGroup">
						<EditableTagGroup/>
					</div>
				</Content>

				<Footer style={{ textAlign: 'center' }}>Smile Archive ©2019 Created by JihyunLee
				</Footer>
			</Layout>
		</div>
	)
}

export default App;
