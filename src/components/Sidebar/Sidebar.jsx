import React from 'react';
import classes from './Sidebar.module.css';
import NavBar from './NavBar/NavBar';
import FriendsContainer from "./Friends/FriendsContainer";

const Sidebar = () => {
    return (
        <aside className={classes._wrapper}>
            <NavBar/>
            <FriendsContainer />
        </aside>
    );
};

export default Sidebar;
