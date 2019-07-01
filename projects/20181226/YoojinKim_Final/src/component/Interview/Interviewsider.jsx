import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './Interviewsider.css'
import Thumbnail from './Thumbnail'
import { PageInterviewDetail } from './PageInterviewDetail'
import { Route, Link } from 'react-router-dom'
import Interviewcontent from './Interviewcontent'


const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const category = "전체보기"

class Interviewsider extends React.Component {
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
                //defaultSelectedKeys={['1']}
                //defaultOpenKeys={['sub1']}
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
                  {/* <Menu.Item key="4">그_냥</Menu.Item>
                  <Menu.Item key="5">최성호특이점</Menu.Item> */}
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              기사보기
              <Interviewcontent/>
              {/* <Route path='/interview' exact component={Thumbnail} /> */}
              {/* <Route path='/interview/:id' component={PageInterviewDetail} /> */}
            </Content>
          </Layout>
        </Content>
      </Layout>

    );
  }
}

export default Interviewsider
