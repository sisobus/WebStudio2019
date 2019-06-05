import React, { Component } from 'react';
import './App.css';

import { Router, Route, Switch } from "react-router-dom";

import { history } from './components/history'
import LoginPage from './components/LoginPage';
import Main from './Main'
import  RegisterForm from './components/RegisterForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path='/login' exact component={LoginPage} />
            <Route path='/register' exact component={RegisterForm} />
            <Route component={Main} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;