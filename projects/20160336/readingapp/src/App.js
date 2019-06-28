import React from 'react';
import './App.css';
import MainPage from './_components/Main'
import WatchedPage from './_components/WatchedPage'
import FavPage from './_components/FavPage'
import MarkedPage from './_components/MarkedPage'
import {  Router, Route } from "react-router"
import { history } from './_components/history'
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={MainPage} />
        <Route path="/watched" exact component={WatchedPage} />
        <Route path="/fav" exact component={FavPage} />
        <Route path="/marked" exact component={MarkedPage} />
      </Router>
    </div>
  );
}

export default App;
