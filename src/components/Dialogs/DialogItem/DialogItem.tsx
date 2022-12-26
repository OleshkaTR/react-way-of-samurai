import React, {FC} from 'react';
import classes from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';

type PropsType = {
    id: number
    name: string
};

const DialogItem: FC<PropsType> = (props) => {
    let path = `/dialogs/${props.id}`;
    return (
        <div className={classes._item}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
};

export default DialogItem;
