import React from 'react';
import {NavLink} from "react-router-dom";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";

const User = ({user, followingInProgress, unFollow, follow}) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img
                            className={classes._photo}
                            src={user.photos.small !== null ? user.photos.small : userPhoto}
                            alt="user photo"/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unFollow(user.id)
                            }}
                        >
                            UnFollow
                        </button>
                        :
                        <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id)
                            }}
                        >
                            Follow
                        </button>
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
