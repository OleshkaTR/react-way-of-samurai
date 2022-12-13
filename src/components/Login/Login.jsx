import React from 'react';
import LoginForm from './LoginForm/LoginForm';

const Login = ({isAuth, logIn}) => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm isAuth={isAuth } logIn={logIn} />
        </div>
    );
};

export default Login;
