import React from 'react'
import './Main.css'
import Nav from './Nav'
import Articles from './Articles'
import Form from './Form'
import SideMenu from './SideMenu'
import { Layout } from 'antd';
import Foot from './Foot'

const { Content } = Layout;

class MainPage extends React.Component {
  render() {
    return (
      <Layout>
        <SideMenu/>
      <Layout style={{ marginLeft: 200 }}>
        <Nav />
        <Content><Form/><Articles /></Content>
        <Foot/></Layout>
      </Layout>
    )
  }
}

export default MainPage