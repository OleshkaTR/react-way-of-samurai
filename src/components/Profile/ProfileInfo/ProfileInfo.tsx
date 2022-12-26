import React, {ChangeEvent, FC, useState} from 'react';

import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png'
import ProfileData from './ProfileData';
import ProfileDataForm from './ProfileDataForm';
import classes from './ProfileInfo.module.css';
import {ProfileType} from '../../../types/types';

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfileData: (state: ProfileType) => void
};

const ProfileInfo: FC<PropsType> = ({
                                        profile,
                                        status,
                                        updateStatus,
                                        isOwner,
                                        savePhoto,
                                        saveProfileData
                                    }) => {

    const [editMode, setEditMode] = useState(false);
    const [state, setState] = useState({
        userId: profile ? profile.userId : 0,
        photos: profile ? profile.photos : {large: '', small: ''},
        fullName: profile ? profile.fullName : '',
        lookingForAJob: profile ? profile.lookingForAJob : false,
        lookingForAJobDescription: profile ? profile.lookingForAJobDescription : '',
        aboutMe: profile ? profile.aboutMe : '',
        contacts: profile ? profile.contacts : {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: '',
        }
    });
    const [contact, setContact] = useState({
        facebook: profile ? profile.contacts.facebook : '',
        website: profile ? profile.contacts.website : '',
        vk: profile ? profile.contacts.vk : '',
        twitter: profile ? profile.contacts.twitter : '',
        instagram: profile ? profile.contacts.instagram : '',
        youtube: profile ? profile.contacts.youtube : '',
        github: profile ? profile.contacts.github : '',
        mainLink: profile ? profile.contacts.mainLink : ''
    });

    if (!profile) {
        return <Preloader/>
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    };

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        let {value, name} = e.target;

        if (name === 'lookingForAJob') {
            value = String(e.target.checked);
        }

        setState({...state, [name]: value});
    };

    const onChangeContactInput = (e: ChangeEvent<HTMLInputElement>) => {
        let {value, name} = e.target;

        setContact({...contact, [name]: value});
    };

    const addToState = () => {
        setState({...state, contacts: {...state.contacts, ...contact}})
    };

    const deactivateEditMode = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveProfileData(state);
        setEditMode(false);
    };

    return (
        <div className={classes._description}>
            <img className={classes.user_photo} src={profile.photos.large ? profile.photos.large : userPhoto}
                 alt="User's"/>
            {isOwner && <input type="file" className={classes.input_block} onChange={mainPhotoSelected}/>}

            {editMode ?
                <ProfileDataForm profile={profile} onChangeInput={onChangeInput}
                                 deactivateEditMode={deactivateEditMode}
                                 onChangeContactInput={onChangeContactInput}
                                 addToState={addToState}/>
                :
                <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}

            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
    );
};

export default ProfileInfo;
