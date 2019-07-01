import React, {Component} from 'react';
import { Layout } from 'antd';

import Menus from "./Menus";

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
        <Header style={{ background: '#fff', Height: '10px'}} >
          <Menus/>
        </Header>

        <Content style={{ background: '#fff', padding: '0 10% 50px 10%' }}>
          <p> 
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                this is ''admin'' page!<br/>
                <br/>
                <br/>
                <a href="create.js">create </a><br/>
                <br/>
                <input type="text" name="title" placeholder="title of work"/><br/>
                <br/>
                <textarea rows="2" name="desc" placeholder="a short description"/><br/>
                <br/>
                <textarea rows="2" name="imgpath" placeholder="image path"/><br/>
                <br/>
                <input type="submit"/><br/>
                <br/>
                <a href="update.js"> update </a>
                <a href="delete.js"> delete </a><br/>
                <br/>
                <br/>
                <br/>
          </p>
        </Content>

        <Footer style={{ background: '#fff', textAlign: 'right' }}>IVE.WORKS ©2019 Created by IVE LEE </Footer>
      </Layout>
    )
  }
}
