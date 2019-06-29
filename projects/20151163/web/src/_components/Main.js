import React from 'react';
import '../App.css';
import AllMenu from '../Menu';
import { Layout } from 'antd';

import Pictures from '../Pictures';

const { Header, Content, Footer } = Layout;

class MainPage extends React.Component{
	render () {
		return(
			<div id="Main">
				<Layout className="layout">
					<Header>
						<AllMenu/>
					</Header>

					<Content style={{ padding: '110px 30px' }}>
						<div className="FrontMessage">
							<h1 className="introduction text uppercase center">
							Smile Archive
							</h1>
							<h2 className= "text center capitalize">
							Hello, this is smile archive site!
							</h2>
						</div>


						<div className="Pictures">
							<div className="StackGrid">
								<Pictures/>
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
