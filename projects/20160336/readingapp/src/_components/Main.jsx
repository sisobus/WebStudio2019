import React from 'react'
import './Main.css'
import Nav from './Nav'
import Articles from './Articles'
import Form from './Form'
import { Layout, Menu, Icon } from 'antd';
import BlankPage from './BlankPage';

const { Header, Content, Footer, Sider } = Layout;

class MainPage extends React.Component {
  render() {
    return (
      <Layout>
      <Sider
      style={{
        overflow: 'auto',
        height: '100%',
        position: 'fixed',
        background:'#24292e',
        color:'#fff'
      }}
    >
    <Menu 
    theme="dark" 
    mode="inline" 
    defaultSelectedKeys={['1']}
    style={{ 
      lineHeight: '64px', 
      color:'#fff', 
      listStyleType: "none",
      paddingLeft:0 }}
    >
        <Menu.Item key="1">
        <span className="nav-text">
            <img src="https://www.lonelyplanet.com/news/wp-content/uploads/2017/03/16124365_1117534098374780_5466006995590971392_n-e1488475313343.jpg" width="50%"/></span>
        </Menu.Item>
        <Menu.Item key="2">
          <span className="nav-text">Watched Movie</span>
        </Menu.Item>
        <Menu.Item key="3">
          <span className="nav-text">Favorites</span>
        </Menu.Item>
        <Menu.Item key="4">
          <span className="nav-text">Bookmark</span>
        </Menu.Item>
        <Menu.Item key="5">
          <span className="nav-text">Log Out</span>
        </Menu.Item>
        </Menu>
    </Sider>
    <Layout style={{ marginLeft: 200 }}>
        <Nav />
        <Form/>
        <Content><Articles /> </Content>
      <Footer style={{textAlign: 'center', padding: 24}}>Published by WebStudio2019</Footer></Layout>
      </Layout>
    )
  }
}

export default MainPage