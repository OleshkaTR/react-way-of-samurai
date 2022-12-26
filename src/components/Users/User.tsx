import { Button } from 'antd';
import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import userPhoto from '../../assets/images/user.png';
import {UserType} from '../../types/types';
import classes from './Users.module.css';

type TypeForUser = {
    user: UserType
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
};

const User: FC<TypeForUser> = ({user, followingInProgress, unFollow, follow}) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img
                            className={classes._photo}
                            src={user.photos.small !== null ? user.photos.small : userPhoto}
                            alt="might be a user"/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <Button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unFollow(user.id)
                            }}
                        >
                            UnFollow
                        </Button>
                        :
                        <Button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id)
                            }}
                        >
                            Follow
                        </Button>
                    }
                </div>
            </span>
            <span>
                <div>{user.name}</div><div>{user.status}</div>
            </span>
                <span>
                <div>{'u.location.city'}</div>
                <div>{'u.location.country'}</div>
            </span>
        </div>
    );
};

export default User;
