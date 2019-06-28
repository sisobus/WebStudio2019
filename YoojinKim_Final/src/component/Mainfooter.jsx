import React from 'react';
import { Layout } from 'antd';

//const { SubMenu } = Menu;
const { Footer } = Layout;


class Mainfooter extends React.Component{
  render(){
    return(
  <Layout>
    <Footer style={{ textAlign: 'center' }}>
      인디에게 ©2019 Created by 'To Indie' 
    </Footer>
  </Layout>

  );
}
}

export default Mainfooter
