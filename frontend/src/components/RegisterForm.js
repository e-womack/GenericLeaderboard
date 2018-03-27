import React, {Component} from 'react';
import '../css/RegisterForm.css';
import privates from '../config/privates';
import ErrorMessage from './ErrorMessage';

export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            password: "",
            passwordVerify: "",
            incorrectPasswordVerify: false,
            takenData: []
        };

        this.loadTakenUserNames();
    }

    loadTakenUserNames = () => {
        fetch(`${privates.url}/player`).then((response) => response.json().then((actualResponse) => {
            this.setState({
                takenData: actualResponse.map(player => {
                    return {name: player.name, email: player.email}
                })
            });
        })).catch(err => console.error(err));
    }

    //Each form component will call this method to update the state

    handleChange = (valueName) => (event) => this.setState({[valueName]: event.target.value});

    // Submit on the child form component will push all data in the state of the
    // child component up to the parent component

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password === this.state.passwordVerify) {
            this
                .props
                .onSubmit(this.state);
            this.setState({email: "", name: "", password: "", passwordVerify: "", incorrectPasswordVerify: false});
        } else {
            this.setState({incorrectPasswordVerify: true, password: "", passwordVerify: ""})
        }
    }

    render() {
        let warningMessage = <ErrorMessage message=" "/>
        if (this.state.takenData.findIndex((a) => a.name === this.state.name) !== -1) {
            warningMessage = (<ErrorMessage message="Username is taken"/>)
        }
        if (this.state.takenData.findIndex((a) => a.email === this.state.email) !== -1) {
            warningMessage = (<ErrorMessage message="Email is taken"/>)
        }
        if (this.state.incorrectPasswordVerify) {
            warningMessage = (<ErrorMessage message="Passwords do not match"/>)

        }
        return (
            <div id="login-box" className="registerForm">
                <div className="left">
                    <h1 id="loginTitle">Sign Up</h1>
                    {warningMessage}
                    <form id="registerAccount" onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            placeholder="E-mail"
                            onChange={this.handleChange("email")}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                            title="Please enter a valid email address"
                            required/>
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            placeholder="Name"
                            onChange={this.handleChange("name")}
                            required/>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange("password")}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            required/>
                        <input
                            type="password"
                            name="passwordVerify"
                            placeholder="Re-type Password"
                            value={this.state.passwordVerify}
                            onChange={this.handleChange("passwordVerify")}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            required/>
                        <input type="submit" name="signup_submit" value="Sign me up"/>
                    </form>
                </div>

                <div className="right">
                    <span className="loginwith">Sign in with<br/>social network</span>

                    <button className="social-signin facebook">Log in with facebook</button>
                    <button className="social-signin twitter">Log in with Twitter</button>
                    <button className="social-signin google">Log in with Google+</button>
                </div>
                <div className="or">OR</div>
            </div>
        );
    }
}