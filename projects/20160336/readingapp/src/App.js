import React from 'react';
import './App.css';
import MainPage from './_components/Main'
import BlankPage from './_components/BlankPage'
import { Router, Route } from "react-router-dom"
import { history } from './_components/history'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={MainPage} />
        <Route path="/blank" exact component={BlankPage} />
        <Route path="/about" exact component={MainPage} />
        <Route path="/hi" exact component={BlankPage} />
        <Route path="/secret" exact component={MainPage} />
      </Router>
    </div>
  );
}

export default App;
