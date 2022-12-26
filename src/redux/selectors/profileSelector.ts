import {AppStateType} from '../reduxStore';

export const getProfile = (state: AppStateType) => state.profilePage.profile;
export const getStatus = (state: AppStateType) => state.profilePage.status;
