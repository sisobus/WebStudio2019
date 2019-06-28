import React from 'react';
import './App.css';
import WelcomPage from './components/WelcomPage'
import MainPage from './components/Main'
import LoginPage from './components/LoginPage'
import UploadPage from './components/UploadPage'
import { PrivateRoute } from './components/PrivateRoute'
import { Router, Route } from "react-router-dom"
import { history } from './components/history'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={WelcomPage} />
        <PrivateRoute path="/main" exact component={MainPage} />
        <PrivateRoute path="/upload" exact component={UploadPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={LoginPage} />
      </Router>
    </div>
  );
}

export default App;