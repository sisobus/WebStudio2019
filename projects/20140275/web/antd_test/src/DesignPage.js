import React, { Component } from 'react';
import { Layout } from 'antd';
import PostCard from './card';
import './App.css'


const { Content } = Layout;


class App extends Component {

  render() {
    console.log('???')
    return (
      <div>
      
      
            <Content>
          <PostCard> 
            
  </PostCard>
            </Content>
          
      </div>
    );
  }
}


export default App;