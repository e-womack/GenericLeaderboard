import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Leaderboard from "./components/Leaderboard";
import AccountPane from "./components/AccountPane";
import RegisterAccount from "./components/RegisterAccount";
import MainPage from "./components/MainPage";
import logo from './img/logo.png';
import './css/App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.checkSession();
  }
  checkSession = () => {
    //Check localstorage or w/e to check if they are logged in, then update state.
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Generic Leaderboard</h1>
          </header>
          <div className="accountPane">
            <AccountPane loggedIn={this.state.loggedIn}/>
          </div>

          <Route exact path="/" component={MainPage}/>
          <Route path="/register" component={RegisterAccount}/> {/* <Route path="/Login" component={FormExample} /> */}
        </div>
      </Router>
    );
  }
}
