import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Leaderboard from "./Leaderboard";

export default class MainPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mainPage">
                <Leaderboard></Leaderboard>
            </div>
        );
    }
}
