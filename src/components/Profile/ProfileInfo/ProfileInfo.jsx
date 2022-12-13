import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={classes._description}>
                <img src={profile.photos.large} alt="User's Photo"/>
                <p><strong>About me: </strong>{ profile.aboutMe }</p>
                <p><strong>Full name: </strong>{ profile.fullName }</p>
                <h3>Contacts:</h3>
                <ul>
                    <li>{profile.contacts.facebook}</li>
                    <li>{profile.contacts.github}</li>
                    <li>{profile.contacts.instagram}</li>
                    <li>{profile.contacts.twitter}</li>
                    <li>{profile.contacts.vk}</li>
                </ul>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <p><strong>looking for a job: </strong>{ profile.lookingForAJob ? 'Of course' : 'No thanks'}</p>
                <p><strong>looking for a job description: </strong>{profile.lookingForAJobDescription ? 'Yep' : 'Nope'}</p>
            </div>
        </div>
    );
};

export default ProfileInfo;
