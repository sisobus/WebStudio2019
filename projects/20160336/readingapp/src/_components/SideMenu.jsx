import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom"
const { Sider } = Layout;

class SideMenu extends React.Component {
    render() {
      return (
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
            <Menu.Item key="1" style={{color:'#00FFFF'}}>
            <span className="nav-text">
            <img src="https://www.lonelyplanet.com/news/wp-content/uploads/2017/03/16124365_1117534098374780_5466006995590971392_n-e1488475313343.jpg" width="50%" alt="very cute quokka face"/>
            <br/><Link to="/" style={{color:'#00FFFF'}} activeStyle={{color: '#fff'}}>*Hello Quokka!*</Link></span>
            </Menu.Item>
            <Menu.Item key="2">
            <span className="nav-text"><Link to="/watched" style={{color:'#fff'}} activeStyle={{color: '#00FFFF'}}>Reviews</Link></span>
            </Menu.Item>
            <Menu.Item key="3">
            <span className="nav-text"><Link to="/marked" style={{color:'#fff'}} activeStyle={{color: '#00FFFF'}}>Check List</Link></span>
            </Menu.Item>
            <Menu.Item key="4">
            <span className="nav-text">Log Out</span>
            </Menu.Item>
          </Menu>
        </Sider>
      );
}
}

export default SideMenu;