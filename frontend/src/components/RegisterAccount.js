import React, {Component} from 'react';
import RegisterForm from './RegisterForm';
import '../css/RegisterAccount.css';
import privates from '../config/privates';

export default class RegisterAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    handleSubmitInParent = ({email, name, password}) => {
        const regData = {
            email,
            name,
            password
        };
        // Make web request to register user with regData Change form into a "Good job "
        // message if registered successfully Change form into a shit message if they
        // tried to register with an email or name that exists already.
    }

    render() {
        return (
            <div className="registerAccount">
                <RegisterForm onSubmit={this.handleSubmitInParent}/>
            </div>
        );
    }
}
