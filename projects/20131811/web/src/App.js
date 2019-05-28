import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Head from './components/Head';
import Page from './components/Page';
import ReviewDate from './components/ReviewDate';
import ReviewStar from './components/ReviewStar';
import Sidebar from './components/Sidebar';
import Upload from './components/Upload';

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
                <Route path="/" exact component={ReviewDate}/>
                <Route path="/reviewdate" exact component={ReviewDate}/>
                <Route path="/reviewstar" exact component={ReviewStar}/>
                <Route path="/page" exact component={Page}/>
                <Route path="/upload" exact compontnt={Upload}/>
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
