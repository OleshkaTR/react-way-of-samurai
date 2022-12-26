import React, {FC} from 'react';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import classes from './Profile.module.css';
import {ProfileType} from '../../types/types';

type ProfileMapPropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (state: ProfileType) => void
};

const Profile: FC<ProfileMapPropsType> = (props) => {
    return (
        <section className={classes}>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile as ProfileType}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfileData={props.saveProfile}
            />
            <MyPostsContainer/>
        </section>
    );
};

export default Profile;
