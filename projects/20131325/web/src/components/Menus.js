import React, {Component} from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

class Menus extends Component {
  constructor(props) {
    super(props);
    
  }
  render () {
  
    return (
      <div className="menubox">
        <Menu className="menu" theme="white" mode="horizontal" defaultSelectedKeys={['1']} align="middle">
          <Menu.Item key="1">
            <Link to="/">
                           I V E . WORKS 
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/contact">
                           CONTACT 
            </Link>
          </Menu.Item>    
        </Menu>
        <div className="logo" style={{ background: '#fff'}} align="middle"/>
      </div>
    );
  }
}

export default Menus;