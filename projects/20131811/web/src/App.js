import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Head from './components/Head';
import Page from './components/Page';
import Sidebar from './components/Sidebar';
import Upload from './components/Upload';
import MovieList from './components/MovieList';
//import ReviewList from './components/ReviewList';
import Login from './components/Login';
//ㄴimport Info from './components/Info';

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render () {
    return (
      <div className="App">
        <Layout>
          <Header>
            <Head/>
            
            
          </Header>
          <Layout>
            <Sider><Sidebar/></Sider>
            <Content>
              <Router>
                <Route path="/" exact component={MovieList}/>
                <Route path="/movielist/:order_by" exact component = {MovieList}/>
                <Route path="/page/:movie_id" exact component={Page}/>
                <Route path="/upload" exact component={Upload}/>
                <Route path="/login" exact component={Login}/>
              </Router>
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
