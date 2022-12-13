import React from 'react';
import classes from './Messages.module.css';

const Messages = (props) => {
    return <div className={classes._message}>{props.message}</div>;
};

export default Messages;
