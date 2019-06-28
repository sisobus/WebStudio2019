import React from 'react'
import { Layout, Button } from 'antd'
import { Link } from "react-router-dom"
import { history } from './history'
import Nav from './Nav'
import SideMenu from './SideMenu'
import Foot from './Foot.jsx'

const { Header, Content, Footer, Sider } = Layout;

class WatchedPage extends React.Component {
  render() {
    return (
    <Layout>
      <SideMenu/>
      <Layout style={{ marginLeft: 200 }}>
        <Nav />
        <Content>
          <h1>Blank Page!!</h1>
          <Link to="/">
            <Button>Go to MainPage</Button>
          </Link>
          <Button>
          <Link to="/blank">Go to Blank</Link>
          </Button>
          <Button type="error" onClick={() => history.push('/blank')}>
            Go to Blank
          </Button>
          </Content>
          <Foot/>
        </Layout>
    </Layout>
    )
  }
}

export default WatchedPage