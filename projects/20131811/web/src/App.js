import React, { Component } from 'react';
import './App.css';

import { Router, Route, Switch } from "react-router-dom";

import Head from './components/Head';
import Page from './components/Page';
import Sidebar from './components/Sidebar';
import Upload from './components/Upload';
import MovieList from './components/MovieList';
import MovieListDate from './components/MovieListDate';
import MovieListStar from './components/MovieListStar';
import { history } from './components/history'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Layout>
            <Header>
              <Head />
            </Header>
            <Layout>
              <Sider>
                <Sidebar />
              </Sider>
              <Content>
                <Switch>
                  <Route path="/" exact component={MovieList} />
                  <Route path="/movielist/date" exact component={MovieListDate} />
                  <Route path="/movielist/star" exact component={MovieListStar} />
                  <Route path="/page/:movie_id" exact component={Page} />
                  <Route path="/upload" exact component={Upload} />
                </Switch>
              </Content>
            </Layout>
            <Footer>Footer</Footer>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;