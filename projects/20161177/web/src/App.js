import React from 'react';
import './App.css';
import LoginPage from './_components/LoginPage';
import MainPage from './_components/MainPage';
import Resister from './_components/Resister';
import {Router, Route} from "react-router-dom";
import {history} from './_components/History';


function App() {
  /*
  localStorage.removeItem('USER')
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('new message')
  localStorage.removeItem('saved messages')
  */
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={LoginPage}/>
        <Route path="/main" exact component={MainPage}/>
        <Route path="/resist" exact component={Resister}/>
      </Router>
    </div>

   
  );
}

export default App;
