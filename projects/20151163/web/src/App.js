import React from 'react';
import './App.css';
/*import UpperMenu from "./UpperMenu";*/
import PicturesWall from "./PicturesWall";
import EditableTagGroup from "./EditableTagGroup";
import { Layout, Menu, Icon } from 'antd';
import MyComponent from './StackGrid';

const { Header, Content, Footer } = Layout;

function App() {
	return (
		<div id="App">
			<Layout className="layout">
				<Header>
					<div className="logo"/><Icon type="smile"/>
					<Menu
        				mode="horizontal"
        				defaultSelectedKeys={['2']}
        				style={{ lineHeight: '64px' }}>			
						<Menu.Item key="1">All</Menu.Item>
						<Menu.Item key="2">Upload</Menu.Item>
						<Menu.Item key="3">Request Enroll</Menu.Item>
      				</Menu>
					{/*<div className="UpperMenu">
						<UpperMenu/>
					</div>*/}
				</Header>

				<Content style={{ padding: '110px 30px' }}>
					<div className="FrontMessage">
						<h1 className="introduction text uppercase center">
							Smile Archive
						</h1>
						<h2 className= "text center capitalize">
							Hello, this is my Smile Archive site!
						</h2>
					</div>

					<div className="Tag">
						<div className="EditableTagGroup">
							<EditableTagGroup/>
						</div>
					</div>

					<div className="Pictures" style={{ background: '#fff', padding: 24, minHeight: 280 }}>
						<div className="StackGrid">
							<MyComponent/>
						</div>
						<div className="PicturesWall">
							<PicturesWall/>
						</div>
					</div>
				</Content>

				<Footer style={{ textAlign: 'center' }}>Smile Archive ©2019 Created by JihyunLee
				</Footer>
			</Layout>
		</div>
	)
}

export default App;
