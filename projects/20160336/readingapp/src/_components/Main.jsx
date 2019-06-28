import React from 'react'
import './Main.css'
import Nav from './Nav'
import Articles from './Articles'
import Form from './Form'
import SideMenu from './SideMenu'
import { Layout, Menu, Icon } from 'antd';
import BlankPage from './BlankPage';

const { Header, Content, Footer, Sider } = Layout;

class MainPage extends React.Component {
  render() {
    return (
      <Layout>
        <SideMenu/>
      <Layout style={{ marginLeft: 200 }}>
        <Nav />
        <Content><Form/><Articles /></Content>
      <Footer style={{textAlign: 'center', padding: 24}}>Published by WebStudio2019</Footer></Layout>
      </Layout>
    )
  }
}

export default MainPage