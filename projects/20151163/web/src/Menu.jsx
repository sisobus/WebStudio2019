import React from 'react';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

class AllMenu extends React.Component{
	render () {
		return(
            <Header>
                <div className="logo"/><Icon type="smile"/>
                    <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}>
                        <Menu.Item key= "1" >
                            <Link to = '/'>All</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to = '/Upload'>Upload</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to = '/Request_Enroll'>Request Enrollment</Link>
                        </Menu.Item>
                    </Menu>
            </Header>
        )
    }
}
export default AllMenu;

class UploadMenu extends React.Component{
	render () {
		return(
            <Header>
                <div className="logo"/><Icon type="smile"/>
                    <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}>
                        <Menu.Item key= "1" >
                            <Link to = '/'>All</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to = '/Upload'>Upload</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to = '/Request_Enroll'>Request Enrollment</Link>
                        </Menu.Item>
                    </Menu>
            </Header>
        )
    }
}


class RequestMenu extends React.Component{
	render () {
		return(
            <Header>
                <div className="logo"/><Icon type="smile"/>
                    <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['3']}
                    style={{ lineHeight: '64px' }}>
                        <Menu.Item key= "1" >
                            <Link to = '/'>All</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to = '/Upload'>Upload</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to = '/Request_Enroll'>Request Enrollment</Link>
                        </Menu.Item>
                    </Menu>
            </Header>
        )
    }
}

export { UploadMenu, RequestMenu};
