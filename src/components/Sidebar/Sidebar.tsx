import React from 'react';

import NavBar from './NavBar/NavBar';
import FriendsContainer from './Friends/FriendsContainer';
import classes from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <aside className={classes._wrapper}>
            <NavBar/>
            <FriendsContainer />
        </aside>
    );
};

export default Sidebar;
