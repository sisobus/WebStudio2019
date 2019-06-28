import React from 'react'
import { Layout } from 'antd'
import Nav from './Nav'
import SideMenu from './SideMenu'
import Foot from './Foot'
import EssayForm from './EssayForm'

const { Content } = Layout;

class WatchedPage extends React.Component {
  render() {
    return (
    <Layout>
      <SideMenu/>
      <Layout style={{ marginLeft: 200 }}>
        <Nav />
        <Content>
          <EssayForm/>
        </Content>
        <Foot/>
        </Layout>
    </Layout>
    );
  }
}

export default WatchedPage;