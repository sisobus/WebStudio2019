import React, { Component } from 'react';
import { Layout } from 'antd';
import Card2 from './Card2';
import './App.css'


const { Content } = Layout;

class PhotoPage extends Component {

  render() {
    console.log('???')
    return (
      <div>
       
              <Content>
            <Card2></Card2> 
            </Content>
            </div>
            
        
    )
  }
}


export default PhotoPage;