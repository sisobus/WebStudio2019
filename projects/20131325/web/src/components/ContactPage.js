import React, {Component} from 'react';
import { Layout } from 'antd';

import Menus from "./Menus";
import Footers from "./Footers";


export default class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    } 
  }

     
  render() {
    const { Header, Content, Footer } = Layout;
    return (
      <Layout className="layout">
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: 'none', Height: '0px'}} >
            <Menus/>
          </Header>

          <Content style={{ background: '#fff', padding: '0 10% 50px 10%' }}>
            <p className = 'contactinfo'> 

                          <div className="ultag1">
                            <br/>
                            <h3 style={{color:'rgba(0, 0, 0, 0.65)'}}>ive lee = 아이브 = 이승혁 </h3>
                            in Seoul, Korea. <br/>
                          </div>

                                  <br/>
                                  <br/>
                                
                          <div className="ultag2">
                            <ul>
                              <li> graphic design </li>
                              <li> art directing </li>
                              <li> photography </li>
                            </ul>
                          </div>
                          
                                  <br/>
                                  <br/>

                          <div className="ultag3">
                            BA at <a href="http://www.sogang.ac.kr/index.do">Sogang Univ.</a>, 2013~ <br/>
                            ( <a href="http://math.sogang.ac.kr/math/index_new.html"> Math. </a> / <a href="http://creative.sogang.ac.kr/">Art&Technology </a>) <br/>
                            <br/>
                          </div>

                          <div className="ultag4">
                            mail : <a href="mailto:universe3306@gmail.com">universe3306@gmail.com</a><br/>
                            instragram <a href="https://www.instagram.com/win.win.ive/">@win.win.ive</a><br/>
                          </div>

                                  <br/>
                                  <br/>

                          <div className="ultag5">
                            c. 2019.&nbsp;&nbsp; I V E . WORKS <br/>
                          </div>
            </p>
          </Content>
          <Footers/>
        </Layout>
    )
  }
}
