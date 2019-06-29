import React, { Component } from 'react';
import './App.css';

import { Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute'


import { history } from './components/history'
import LoginPage from './components/LoginPage';
import Main from './Main'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path='/login' exact component={LoginPage} />
            <Route path='/register' exact component={LoginPage} />
            <PrivateRoute component={Main} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;