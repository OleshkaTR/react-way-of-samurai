import React, {useEffect} from 'react';
import Profile from './Profile';
import {connect, useSelector} from 'react-redux';
import {getUserProfile, getUserStatus, updateUserStatus} from '../../redux/profileReducer';
import {useParams} from 'react-router-dom';
import {compose} from 'redux';
import {withAuthNavigateComponent} from '../../hoc/withAuthNavigateComponent';

const ProfileContainer = (props) => {
    let {userId} = useParams();
    let auth = useSelector(state => state.auth.userId)

    if (!userId) {
        userId = auth;
    }

    useEffect(() => {
        props.getUserProfile(userId);
        props.getUserStatus(userId);
    }, []);

    return <Profile
        {...props}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateUserStatus}
    />;
};

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
});

export default compose(
    withAuthNavigateComponent,
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus })
)(ProfileContainer);
