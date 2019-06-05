import React, { Component } from 'react';
import './App.css';

import { Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute'

import Head from './components/Head';
import Page from './components/Page';
import Sidebar from './components/Sidebar';
import Upload from './components/Upload';
import MovieListDate from './components/MovieListDate';
import MovieListStar from './components/MovieListStar';
import { history } from './components/history'
import { Layout } from 'antd';
import AddMovieForm from './components/AddMovieForm';
import MainPage from './components/Main'
import LoginPage from './components/LoginPage';


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
                  <PrivateRoute path="/" exact component={MovieListDate} />
                  <Route path='/login' exact component={LoginPage} />
                  <Route path='/register' exact component={LoginPage} />
                  <PrivateRoute path="/movielist/date" exact component={MovieListDate} />
                  <PrivateRoute path="/movielist/star" exact component={MovieListStar} />
                  <PrivateRoute path="/page/:movie_id" exact component={Page} />
                  <PrivateRoute path="/upload" exact component={Upload} />
                  <PrivateRoute path="/add" exact component={AddMovieForm} />
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