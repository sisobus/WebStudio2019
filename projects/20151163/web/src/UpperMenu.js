import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class UpperMenu extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            
            <Menu.Item className="logo">
            <Icon type="smile"/>
            </Menu.Item>
            
            <Menu.Item className="Menu-Middle">
              <Menu.Item key="picture">
                <Icon type="picture" />
                All Photos
              </Menu.Item>

              <Menu.Item key="Liked">
                <Icon type="heart" />
                Liked Ones
              </Menu.Item>

              <Menu.Item key="Upload">
                <Icon type="upload" />
                Upload
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                </a>
              </Menu.Item>
            </Menu.Item>

            <Menu.Item className="Right-Menu">
              <Menu.Item id="user">
                <Icon type="user" />
                User
              </Menu.Item>

              <SubMenu
                title={
                  <span className="submenu">
                    <Icon type="ellipsis" />
                    More
                  </span>
                }
              >
                <MenuItemGroup title="Item 1">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="Item 2">
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4">Option 4</Menu.Item>
                </MenuItemGroup>
              </SubMenu>
            </Menu.Item>
        </Menu>
    );
  }
}

export default UpperMenu;