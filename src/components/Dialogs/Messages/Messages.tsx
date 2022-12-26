import React, {FC} from 'react';
import classes from './Messages.module.css';

type PropsType = {
    message: string
};

const Messages: FC<PropsType> = (props) => {
    return <div className={classes._message}>{props.message}</div>;
};

export default Messages;
