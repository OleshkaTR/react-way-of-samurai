import React from 'react';
import classes from './Friend.module.css';

const Friend = ({name}) => {
    return (
        <div className={classes._wrapper}>
            <svg></svg>
            <p>{name}</p>
        </div>
    );
};

export default Friend;
