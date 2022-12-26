import React, {FC, FormEvent, memo, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {AppStateType, TypeDispatch} from '../../../redux/reduxStore';
import {logIn} from '../../../redux/authReducer';

const LoginForm: FC = memo((props) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const dispatch = useDispatch<TypeDispatch<AppStateType>>();

    const [loginUser, setLoginUser] = useState({
        email: '',
        password: '',
        rememberMe: false,
        captcha: ''
    });

    const user = () => {
        setLoginUser({
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        });
    };

    if (isAuth) {
        return <Navigate to='/profile'/>;
    }

    const useLogin = (e: FormEvent<HTMLElement>) => {
        user();
        e.preventDefault();
        dispatch(logIn(loginUser.email, loginUser.password, loginUser.rememberMe, loginUser.captcha));
        if (!isAuth) {
            return <Navigate to='/login'/>;
        } else {
            return <Navigate to='/profile'/>;
        }
    };

    return (
        <form onSubmit={useLogin}>
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

            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
            {captchaUrl && <input
                type='text'
                placeholder='Enter symbols'
                value={loginUser.captcha}
                onChange={(e) =>
                    setLoginUser({...loginUser, captcha: e.target.value})
                }
            />}
            <button>
                Login
            </button>
        </form>
    );
});

export default LoginForm;
