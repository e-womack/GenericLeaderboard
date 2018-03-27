import React from 'react';
import "../css/RegisterComplete.css"

const RegisterComplete = (props) => {
    return (
        <div id="complete-box" className="registerForm">
            <h1 id="completeTitle">{props.name}<br/>
                You have successfully registered!</h1>
        </div>
    )
};
export default RegisterComplete;