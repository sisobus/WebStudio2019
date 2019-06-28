import React from 'react';
import './App.css';
import MainPage from './_components/Main'
import BlankPage from './_components/BlankPage'
import {  Router, Route } from "react-router"
import { history } from './_components/history'
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={MainPage} />
        <Route path="/blank" exact component={BlankPage} />
      </Router>
    </div>
  );
}

export default App;
