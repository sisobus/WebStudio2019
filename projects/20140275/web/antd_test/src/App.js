import React, { Component } from 'react';
import { Layout } from 'antd';
import Sider2 from './sider2';
import './App.css'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import main from "./main";
import Design from "./DesignPage";
import Photography from "./PhotoPage";
import And from "./AndPage";



const { Header, Content } = Layout;




class App extends Component {

  render() {
    console.log('???')
    return (  
      <div>
        
        <Layout>
          <Header>SORAPICK</Header>
          <Layout>
          
            <Sider2>Sider</Sider2>
            <br/>
            <div>
              <Content>
        
             
            
            </Content>
            <Router>   
              <Switch>
              <div>
                
              <Route exact path="/" component={main} />
              <Route exact path="/design" component={Design} />
              <Route exact path="/photo" component={Photography} />
              <Route exact path="/and" component={And} />
              </div>
              </Switch>
            </Router>
           
            </div>

            
          </Layout>
        
        </Layout>
       
      </div>
    )
  }
}


export default App;