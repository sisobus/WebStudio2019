import React  from 'react';

import { Menu, Icon } from 'antd';


class Sider2 extends React.Component {
    state = {
      current: 'mail',
    };
  
    handleClick = e => {
      console.log('click ',e);
      
      this.setState({
        current: e.key,
      });
    };
  
    render() {
      return (
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="mail" >
            <Icon type="close" />
            NCT127
                  
            <Icon type="close" />
          </Menu.Item>
          <Menu.Item key="app" >
            <Icon type="close" />
            MARK
          </Menu.Item>
          <Menu.Item key="???" >
            <Icon type="close" />
            JAEHYUN
          </Menu.Item>
          <Menu.Item key="????" >
            <Icon type="close" />
            AND
          </Menu.Item>

        </Menu>
      );
    }
  }
  
  export default Sider2;