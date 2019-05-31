import React from 'react';
import '../App.css';
import PicturesWall from "../PicturesWall";
import EditableTagGroup from "../EditableTagGroup";
import { Layout } from 'antd';
import MenuBar from '../Menu'

const { Header, Content, Footer } = Layout;

class Upload extends React.Component{
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
						Upload Page
						</h1>
						<h2 className= "text center capitalize">
						What do U want to upload?
						</h2>
					</div>

					<div className="Tag">
						<div className="EditableTagGroup">
							<EditableTagGroup/>
						</div>
					</div>

					<div className="PicturesWall">
						<PicturesWall/>
					</div>
				</Content>

				<Footer style={{ textAlign: 'center' }}>Smile Archive ©2019 Created by JihyunLee
				</Footer>
			</Layout>
		</div>
		)
	}
}

export default Upload