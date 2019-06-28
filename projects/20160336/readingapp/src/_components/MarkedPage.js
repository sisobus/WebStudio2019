import React from 'react'
import { Layout, Button } from 'antd'
import { Link } from "react-router-dom"
import { history } from './history'
import Nav from './Nav'
import SideMenu from './SideMenu'
import Foot from './Foot.jsx'
import { List, Typography, Checkbox } from 'antd';

const data = [
  ' Davinci Code ',
  ' Juno ',
  ' My Fair Lady ',
  ' the Matrix Series ',
  ' Happy Death Day ',
];
const { Header, Content, Footer, Sider } = Layout;

class MarkedPage extends React.Component {
  render() {
    return (
    <Layout>
      <SideMenu/>
      <Layout style={{ marginLeft: 200 }}>
        <Nav />
        <Content>
          <h2>Hello! Time to cross off the list!<br/><br/></h2>
          <h4>This is your movie Wish List</h4>
          <List style={{
          }}
            bordered
            dataSource={data}
            renderItem={item => (
            <List.Item style={{listStyleType: "none"}}>
              <Typography.Text mark>          
                <Checkbox>
                </Checkbox></Typography.Text> {item}
            </List.Item>
            )}
          />
        </Content>
        <Foot/>
        </Layout>
    </Layout>
    );
  }
}

export default MarkedPage;