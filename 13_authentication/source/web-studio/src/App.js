import React from 'react';
import './App.css';
import MainPage from './_components/Main'
import BlankPage from './_components/BlankPage'
import { LoginPage } from './_components/LoginPage'
import { PrivateRoute } from './_components/PrivateRoute'
import { Router, Route } from "react-router-dom"
import { history } from './_components/history'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <PrivateRoute path="/" exact component={MainPage} />
        <Route path="/blank" exact component={BlankPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={LoginPage} />
        <Route path="/secret" exact component={MainPage} />
      </Router>
    </div>
  );
}

export default App;
