import React, {Component} from "react";
import RegisterForm from "./RegisterForm";
import RegisterComplete from "./RegisterComplete";
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

    determineStatus = (response) => {
        let newState = {};
        if (response.err === "User already exists" || response.message === "User already exists") {
            newState.registerState = 2;
            newState.errorMessage = "User already exists";
        } else if (response.name) {
            newState.registerState = 1;
            newState.registeredName = response.name;
        } else {
            newState.registerState = -1;
            newState.errorMessage = "Unknown error, try again later";
        }
        this.setState(newState);
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

    render() {
        let registerComponent = null;
        if (this.state.registerState === 1) {
            registerComponent = (
                <div className="registerComplete">
                    <RegisterComplete name={this.state.registeredName}/>
                </div>
            )
        } else {
            registerComponent = (
                <div className="registerAccount">
                    <RegisterForm
                        onSubmit={this.handleSubmitInParent}
                        submitErrorMessage={this.state.errorMessage}/>
                </div>
            )
        }
        return registerComponent;
    }
}