import React from 'react'
import { Menu, Icon } from 'antd';

const { SubMenu }  = Menu;
const MenuItemGroup = Menu.ItemGroup;

class Sider extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>Main</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="My books">
            <Menu.Item key="1">Records</Menu.Item>
            <Menu.Item key="2">Interested</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    );
  }
}


export default Sider
