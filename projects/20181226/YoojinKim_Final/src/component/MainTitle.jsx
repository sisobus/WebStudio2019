import React from 'react';
import { Layout } from 'antd';
import './MainTitle.css'
import { Link } from "react-router-dom"

const { Footer } = Layout;
var Logo = require('./titleLogo_대지 1.svg');

class MainTitle extends React.Component{
  render(){
    return(
  <Layout>
    <Footer>
    <div className="Ltitle">
        <div className="logo">
        <Link to ="/">
          <img src={Logo} />
        </Link>
       </div>
      </div>
    </Footer>
  </Layout>

  );
}
}

export default MainTitle
