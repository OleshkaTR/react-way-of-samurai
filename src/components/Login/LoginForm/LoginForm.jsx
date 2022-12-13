import React, {useState} from 'react';
import {Navigate} from "react-router";

const LoginForm = ({isAuth, logIn}) => {

    const [loginUser, setLoginUser] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const user = () => {
        setLoginUser({
            email: '',
            password: '',
            rememberMe: false
        });
    };

    if (isAuth) {
        return <Navigate to='/profile'/>;
    }

    const useLogin = (e) => {
        user();
        e.preventDefault();
        logIn(loginUser.email, loginUser.password, loginUser.rememberMe);
        if (!isAuth) {
            return <Navigate to='/login'/>
        } else {
            return <Navigate to='/profile'/>
        }
    };

    return (
        <form>
            <p>
                <strong>Email: </strong>
                <input
                    type='email'
                    placeholder='Enter email'
                    value={loginUser.email}
                    onChange={(e) =>
                        setLoginUser({...loginUser, email: e.target.value})
                    }
                />
            </p>
            <p>
                <strong>Password: </strong>
                <input
                    type='password'
                    placeholder='Enter password'
                    value={loginUser.password}
                    onChange={(e) =>
                        setLoginUser({...loginUser, password: e.target.value})
                    }
                />
            </p>
            <div>
                <input
                    type="checkbox"
                    value={loginUser.email}
                    onChange={(e) =>
                        setLoginUser({...loginUser, rememberMe: Boolean(e.target.value)})
                    }
                />
                <label>Remember me</label>
            </div>
            <button
                onClick={useLogin}
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;
