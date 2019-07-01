import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import ContactPage from "./components/ContactPage";
import MainPage from "./components/MainPage";
import AdminPage from "./components/AdminPage";
import ContentPages from "./components/ContentPages";


class App extends Component {
  constructor(props) {
    super(props);    
    this.state = {
    } 
  }  

  render () {
    return (  
        <div className="App">
          <Router>
            <Route path="/" exact component={()=> {
              return <MainPage/>
            }} />
            <Route path="/contact" component={() => {
              return <ContactPage/>
            }} />
            <Route path="/admin" component={() => {
              return <AdminPage/>
            }} />
            <Route path="/content/:id"  component={()=> {
              return <ContentPages/>
            }} />
          </Router>
        </div>
    );
  }
}


export default App;