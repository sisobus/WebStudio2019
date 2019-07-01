import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './ReviewSider.css'
import ReviewContent from './ReviewContent'


const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const category = "전체보기"


class ReviewSider extends React.Component{
//  state = {
//    Clicked1906: false,
//    Clicked1908: false,
//  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
//    if (e.key === 'sub1') {
//      console.log('clicked');
//      this.setState({
//        Clicked1906: true,
//        category : "2019 6월",
//      })
//    }
//    if (e.key === 'sub2') {
//      console.log('clicked');
//      this.setState({
//        Clicked1908: true,
//        category : "2019 7월",
//      })
//    }
  };
  render(){
    return(
  <Layout>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>인디에게</Breadcrumb.Item>
        <Breadcrumb.Item>후기</Breadcrumb.Item>
        <Breadcrumb.Item><category /></Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            //defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <Menu.Item key="1">공연후기</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
        후기보기
        <ReviewContent />
        </Content>
      </Layout>
    </Content>
  </Layout>

  );
}
}

export default ReviewSider
