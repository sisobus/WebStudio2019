import React from 'react';
import './App.css';
import LoginPage from './_components/LoginPage';
import MainPage from './_components/MainPage';
import GamePage from './_components/GamePage';
import {Router, Route} from "react-router-dom";
import {history} from './_components/History';

function App() {
  return (
    <div classname="App">
      <Router history={history}>
        <Route path="/" exact component={LoginPage}/>
        <Route path="/main" exact component={MainPage}/>
        <Route path="/game" exact component={GamePage}/>
      </Router>
    </div>

   
  );
}

export default App;
