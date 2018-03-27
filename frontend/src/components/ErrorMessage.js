import React from 'react';

const ErrorMessage = (props) => {
    return (
        <div>
            <p
                style={{
                color: "red",
                size: 10
            }}>{props.message}
            </p>
            <br/>
        </div>
    )
};
export default ErrorMessage;