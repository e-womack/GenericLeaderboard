import React, {Component} from 'react';
import logo from './logo.svg';
import './css/App.css';
import Leaderboard from "./components/Leaderboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Generic Leaderboard</h1>
        </header>

        <Leaderboard></Leaderboard>
      </div>
    );
  }
}

export default App;
