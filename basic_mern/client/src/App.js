import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Users from './users.js'
import Contact from './contact.js'
import Login from './login.js'
import Home from './home.js'
import Listing from './listing.js'
import Navbar from './navbar.js'

class App extends Component {

  render() {
    return(
      <div>
        <Navbar />
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/listing" component={Listing} />
          </div>
        </Router>
      </div>
    )
  }


}

export default App