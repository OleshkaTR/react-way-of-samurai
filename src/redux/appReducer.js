import {setUserAuth} from "./authReducer";

const SET_INITIALIZED = 'app/SET_INITIALIZED';

const initialState = {
    initialized: false,
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

const initializedSuccess = () => ({type: SET_INITIALIZED});

export const initializeApp = () => (dispatch) => {
    let dispatchResult = dispatch(setUserAuth());
    dispatchResult.then(() => {
        dispatch(initializedSuccess());
    });
};
