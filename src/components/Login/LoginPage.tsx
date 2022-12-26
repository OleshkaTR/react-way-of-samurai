import React, {FC} from 'react';

import LoginForm from './LoginForm/LoginForm';

const LoginPage: FC = (props) => {

    return (
        <div>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;
