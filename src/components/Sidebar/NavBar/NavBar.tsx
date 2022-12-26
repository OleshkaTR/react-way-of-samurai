import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavBar.module.css';

const NavBar = () => {

    let activeLink = ({ isActive }: any) => isActive ? {color: 'gold'} : undefined;

    return (
        <nav className={classes.navBar}>
            <ul>
                <li className={classes.item}>
                    <NavLink to="/profile" style={activeLink}>Profile</NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink to="/dialogs" style={activeLink}>Message</NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink to="/news" style={activeLink}>News</NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink to="/users" style={activeLink}>Users</NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink to="/music" style={activeLink}>Music</NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink to="/settings" style={activeLink}>Settings</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
