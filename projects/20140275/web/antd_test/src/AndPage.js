import React, { Component } from 'react';
import { Layout } from 'antd';
import Card3 from './Card3';
import './App.css'


const { Content } = Layout;

class And extends Component {

  render() {
    console.log('???')
    return (
      <div>
     
              <Content>
            <Card3></Card3> 
            </Content>
        
      </div>
    )
  }
}


export default And;