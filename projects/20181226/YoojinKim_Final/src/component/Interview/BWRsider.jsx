import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './Interviewsider.css'
import { Route, Link } from 'react-router-dom'
import BWRinterview from './BWRinterview'


const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const category = "벤치위레오"

class BWRsider extends React.Component {

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  render() {
    return (
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>인디에게</Breadcrumb.Item>
            <Breadcrumb.Item>인터뷰</Breadcrumb.Item>
            <Breadcrumb.Item><category /></Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                style={{ height: '100%' }}
              >
                  <Menu.Item key="1">
                    <Link to ='/interview/'>
                    전체보기</Link></Menu.Item>
                  <Menu.Item key="2">
                    <Link to ='/interview/benchwereo'>
                    벤치위레오</Link></Menu.Item>
                  <Menu.Item key="3">
                  <Link to ='/interview/blsg'>
                    분리수거 밴드</Link></Menu.Item>
                  <Menu.Item key="4">406호 프로젝트</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              기사보기
              <BWRinterview/>
              {/* <Route path='/interview' exact component={Thumbnail} /> */}
              {/* <Route path='/interview/:id' component={PageInterviewDetail} /> */}
            </Content>
          </Layout>
        </Content>
      </Layout>

    );
  }
}

export default BWRsider
