import React, {Component} from "react";
import RegisterForm from "./RegisterForm";
import "../css/RegisterAccount.css";
import privates from "../config/privates";

export default class RegisterAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registerState: 0,
            registeredName: "",
            errorMessage: ""
        };
    }
    // 0 means not attempted 1 means successful registration, change shown component
    // to gj wp xoxox etc 2 means user already exists with email 3 means user
    // already exists with username (do your own validation on this frontend) -1
    // means wtf
    determineStatus = (response) => {
        let newState = {};
        console.log(response);
        if (response.message === "User already exists") {
            newState.registerState = 2;
            newState.errorMessage = "User already exists with this email or username";
        } else if (response.name) {
            newState.registerState = 1;
            newState.registerName = response.name;
        } else {
            newState.registerState = -1;
            newState.errorMessage = "Unknown error, try again later";
        }
    }

    handleSubmitInParent = ({email, name, password}) => {
        const regData = {
            email,
            name,
            password
        };
        fetch(`${privates.url}/player`, {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
                body: JSON.stringify(regData)
            })
            .then(response => response.json())
            .then(actualResponse => this.determineStatus(actualResponse))
            .catch(err => this.determineStatus(err));
    }
    // Make web request to register user with regData Change form into a "Good job "
    // message if registered successfully Change form into a shit message if they
    // tried to register with an email or name that exists already.

    render() {
        // if registerState = 0, show registerAccount if 1, show successfull register
        // component if -1 send down a submit error message if 2 send down invalid email
        // error message
        return (
            <div className="registerAccount">
                <RegisterForm
                    onSubmit={this.handleSubmitInParent}
                    submitErrorMessage={this.state.errorMessage}/>
            </div>
        );
    }
}