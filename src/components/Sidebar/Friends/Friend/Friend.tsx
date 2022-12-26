import React, {FC} from 'react';

import classes from './Friend.module.css';

type FriendType = {
    name: string
}

const Friend: FC<FriendType> = ({name}) => {
    return (
        <div className={classes._wrapper}>
            <svg></svg>
            <p>{name}</p>
        </div>
    );
};

export default Friend;
