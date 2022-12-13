import React from 'react';
import classes from './Post.module.css';

const Post = ({message, likesCount}) => {
    return (
        <div className={classes.item}>
            <h3>Username</h3>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF7iZAaYp5jiRX44FeGVJ2wMrY4tnqhPdb_A&usqp=CAU"
                alt="avatar"/>
            <p>{ message }</p>
            <span className={classes.item__span}>Likes { likesCount }</span>
        </div>
    );
};

export default Post;
