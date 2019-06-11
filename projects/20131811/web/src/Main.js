import React, { Component } from 'react';
import './App.css';

import { Switch } from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute'

import Head from './components/Head';
import Page from './components/Page';
import Sidebar from './components/Sidebar';
import MovieListDate from './components/MovieListDate';
import MovieListStar from './components/MovieListStar';
import { Layout } from 'antd';
import AddMovieForm from './components/AddMovieForm';
import LoginInfo from './components/LoginInfo';



const { Header, Footer, Sider, Content } = Layout;

class Main extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <Head />
                    </Header>
                    <LoginInfo />
                    <Layout>
                        <Sider>
                            <Sidebar />
                        </Sider>
                        <Content className='body'>
                            <Switch>
                                <PrivateRoute path="/" exact component={MovieListDate} />
                                <PrivateRoute path="/movielist/date" exact component={MovieListDate} />
                                <PrivateRoute path="/movielist/star" exact component={MovieListStar} />
                                <PrivateRoute path="/page/:movie_id" exact component={Page} />
                                <PrivateRoute path="/add" exact component={AddMovieForm} />
                            </Switch>
                        </Content>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>
            </div>
        );
    }
}

export default Main;