import React from 'react';
import { Layout } from 'antd';
import Thumbnail from './Thumbnail'

//const { SubMenu } = Menu;
const { Content } = Layout;


class Interviewcontent extends React.Component{
  render(){
    return(
  <Layout>
    <Content style={{ padding: '0 24px', minHeight: 280 }}>
        Content
        <Thumbnail />
    </Content>
  </Layout>
  );
}
}

export default Interviewcontent
