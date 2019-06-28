import React from 'react';
import '../App.css';
import { Layout } from 'antd';
import {RequestMenu} from '../Menu';
import  WrappedRegistrationForm  from '../Registerform.jsx';


const { Header, Content, Footer } = Layout;

class Request_Enroll extends React.Component{
	render () {
		return(
			<div id="Main">
			<Layout className="layout">
				<Header>
					<RequestMenu/>
				</Header>

				<Content style={{ padding: '110px 30px 200px 30px' }}>
					<div className="FrontMessage">
						<h1 className="introduction text uppercase center">
						Request Enrollment Page
						</h1>
						<h2 className= "text center capitalize">
						Who are U?
						</h2>
					</div>
					<div className='Request'>
						<WrappedRegistrationForm/>
					</div>
				</Content>

				<Footer style={{ textAlign: 'center' }}>Smile Archive ©2019 Created by JihyunLee
				</Footer>
			</Layout>
		</div>
		)
	}
}

export default Request_Enroll
