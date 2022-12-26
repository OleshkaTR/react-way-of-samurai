import React, {FC, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {compose} from 'redux';

import {getUserProfile, getProfileStatus, updateProfileStatus, saveProfilePhoto, saveProfileData} from '../../redux/profileReducer';
import Profile from './Profile';
import {withAuthNavigateComponent} from '../../hoc/withAuthNavigateComponent';
import {AppStateType, TypeDispatch} from '../../redux/reduxStore';
import {getAuth} from '../../redux/selectors/authSelectors';
import {getProfile, getStatus} from '../../redux/selectors/profileSelector';
import {ProfileType} from '../../types/types';

const ProfileContainer: FC = (props) => {

    let params = useParams();
    let userId : number | null = +params.userId!;
    let auth = useSelector(getAuth);
    let profile = useSelector(getProfile);
    let status = useSelector(getStatus);
    const dispatch = useDispatch<TypeDispatch<AppStateType>>();

    const getSelectedUserProfile = (userId: number) => {
        dispatch(getUserProfile(userId));
    }

    const geStatus = (userId: number) => {
        dispatch(getProfileStatus(userId));
    }

    const updateStatus = (status: string) => {
        dispatch(updateProfileStatus(status));
    }

    const savePhoto = (file: File) => {
        dispatch(saveProfilePhoto(file));
    }

    const saveProfile = (profileData: ProfileType) => {
        dispatch(saveProfileData(profileData));
    }

    if (!userId) {
        userId = auth;
    }

    useEffect(() => {
        getSelectedUserProfile(userId as number);
        geStatus(userId as number);
    }, [userId]);

    return <Profile
        {...props}
        isOwner={userId === auth}
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        savePhoto={savePhoto}
        saveProfile={saveProfile}
    />;
};

let mapStateToProps = (state: AppStateType) => ({
});

export default compose(
    withAuthNavigateComponent,
    connect(mapStateToProps, {})
)(ProfileContainer);
