import React from 'react';
import classes from './Header.module.css';
import {NavLink, useNavigate} from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();
    const goOut = () => {
        props.logOut();
        navigate('/login');
    };

    return (
        <header className={classes.header}>
            <img src="" alt="logo"/>
            <div className={classes._loginBlock}>
                {props.isAuth ?
                    <div>
                        {props.login}
                        <button
                            onClick={goOut}
                        >
                            Logout
                        </button>
                    </div>
                    :
                    <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;
