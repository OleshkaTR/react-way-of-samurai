import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return (
        <section className={classes}>
            <ProfileInfo
                profile={ props.profile }
                status={ props.status }
                updateStatus={ props.updateStatus }
            />
            <MyPostsContainer />
        </section>
    );
};

export default Profile;
