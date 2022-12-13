import {authAPI} from '../api/api';

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const LOGIN = 'samurai-network/auth/LOGIN';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case LOGIN:
            return {
                ...state,
                email: action.email
            };
        default:
            return state;
    }
};

const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

export const setUserAuth = () => async (dispatch) => {
    let data = await authAPI.me();
    if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
};

export const logIn = (email, password, rememberMe) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === 0) {
        dispatch(setUserAuth());
    } else {
        alert('Not correct email or password');
    }
};

export const logOut = () => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};
