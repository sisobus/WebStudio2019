import React from 'react';
import { Layout, Menu } from 'antd';
//import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './Mainheader.css'
//import Home from './Home'
//import Mainpage from './Main'
//import Interview_Page from './Interview_Page'
import { Link } from "react-router-dom"
import MainTitle from './MainTitle'

//const { SubMenu } = Menu;
const { Header } = Layout;


class Mainheader extends React.Component{
  render(){
    return(
//<Router>
  <Layout>
    <MainTitle />
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
        //defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
        align="middle"
      >
        <Menu.Item key="1">
          <Link to ="/review">
           Review
            </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to ="/interview">
          Interview
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to ="/visual">
           Visual
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  </Layout>
  //<Route exact path='/' component={Home}/>
  //<Route path='/Interview_Page' component={Interview_Page}/>
//</Router>

  );
}
}

export default Mainheader