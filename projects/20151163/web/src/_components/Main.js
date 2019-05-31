import React from 'react';
import '../App.css';
import MenuBar from '../Menu';
import EditableTagGroup from "../EditableTagGroup";
import { Layout } from 'antd';
import MyComponent from '../StackGrid'

/*import { NavLink } from 'react-router-dom'*/


const { Header, Content, Footer } = Layout;

class MainPage extends React.Component{
	render () {
		return(
			<div id="Main">
				<Layout className="layout">
					<Header>
						<MenuBar/>
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
							{/*<Users></Users>
							<Articles></Articles>*/}
							<div className="StackGrid">
								<MyComponent/>
							</div>
						</div>
					</Content>

					<Footer style={{ textAlign: 'center' }}>Smile Archive ©2019 Created by JihyunLee
					</Footer>
				</Layout>
			</div>
		)
	}
}
export default MainPage
