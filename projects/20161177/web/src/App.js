import React from 'react';
import './App.css';
import LoginPage from './_components/LoginPage';
import MainPage from './_components/MainPage';
import GamePage from './_components/GamePage';
import Resister from './_components/Resister';
import {Router, Route} from "react-router-dom";
import {history} from './_components/History';
import {io} from './_components/chat-server'

function App() {
  console.log(io)
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={LoginPage}/>
        <Route path="/main" exact component={MainPage}/>
        <Route path="/game" exact component={GamePage}/>
        <Route path="/resist" exact component={Resister}/>
      </Router>
    </div>

   
  );
}

export default App;
