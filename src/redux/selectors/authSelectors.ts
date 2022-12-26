import {AppStateType} from '../reduxStore';

export const getAuth = (state: AppStateType) => state.auth.userId;
export const getLogin = (state: AppStateType) => state.auth.login;
