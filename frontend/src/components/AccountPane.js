import React, {Component} from 'react';
import '../css/AccountPane.css';
import privates from '../config/privates';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export default class AccountPane extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let content = null;
        if (this.props.loggedIn) {
            content = (
                <div>My Profile</div>
            )
        } else {
            content = (
                <ul id="login_signup">
                    <li>
                        <Link to="/" id="home_link">Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" id="login_link">Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" id="sign_link">Register
                        </Link>
                    </li>
                </ul>
            )
        }

        return (
            <div className="accountPane">{content}</div>
        );
    }
}
