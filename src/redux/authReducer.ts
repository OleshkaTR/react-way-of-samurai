import {ResultCodeEnum, ResultCodeForCaptchaEnum} from '../api/api';
import {BaseThunkType, InferActionsTypes} from './reduxStore';
import {authAPI} from '../api/authApi';
import {secureApi} from '../api/securityApi';

const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'samurai-network/auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            };
        case 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'samurai-network/auth/SET_USER_DATA',
        payload: {userId, email, login, isAuth},
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const),
};

export const setUserAuth = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();

    if (data.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = data.data;
        dispatch(actions.setAuthUserData(id, login, email, true));
    }
};

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch)  => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodeEnum.Success) {
        await dispatch(setUserAuth());
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl());
        }
        alert('Not correct email or password');
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await secureApi.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
    if (data.resultCode === ResultCodeEnum.Success) {
        await dispatch(setUserAuth());
    } else {
        alert('Not correct email or password');
    }
};

export const logOut = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
};

// export type InitialStateType = typeof initialState;
type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean | false,
    captchaUrl: string | null
};
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
