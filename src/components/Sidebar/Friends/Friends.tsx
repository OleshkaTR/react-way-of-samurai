import React, {FC} from 'react';

import Friend from './Friend/Friend';
import {MapStateToFriendsPropsType} from '../../../types/types';
import classes from './Friends.module.css';

const Friends: FC<MapStateToFriendsPropsType> = ({friends}) => {

    let friendsElements = friends
        .map((f, index) =>
            <Friend
                key={index}
                name={f.name}
            />
        );

    return (
        <div className={classes._wrapper}>
            <h2 className={classes._header}>Friends</h2>

            <div className={classes._wrapper__friends}>
                { friendsElements }
            </div>
        </div>
    );
};

export default Friends;
