import React from 'react';
import { Menu, Icon } from 'antd';
/*import Autoset from "./Autoset";*/

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
      <div>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          padding: '0 40px'
        }}><img src="https://s.pstatic.net/static/www/img/2018/sp_search.svg" alt= 'naver logo' height="20px"></img></div>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
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
        </Menu>

        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal"
          style={{
            position: 'absolute',
            right: 0,
            top: 0
          }}>
          <Menu.Item id="user">
            <Icon type="user" />
            User
            {/*<Autoset/>*/}
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

        </Menu>
      </div>
    );
  }
}

/*ReactDOM.render(<UpperMenu />, mountNode);*/
export default UpperMenu;