import React from 'react'
import { Layout } from 'antd';

const { Footer } = Layout;

class Foot extends React.Component {
    render() {
      return (
      <Footer style={{textAlign: 'center', padding: 24}}>Published by WebStudio2019</Footer>
      )
    }
}

export default Foot;