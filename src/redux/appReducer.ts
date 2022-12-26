import {setUserAuth} from './authReducer';
import {BaseThunkType, InferActionsTypes} from './reduxStore';

const initialState = {
    initialized: false
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

const actions = {
    initializedSuccess: () => ({type: 'app/SET_INITIALIZED'} as const),
};

type ThunkType = BaseThunkType<ActionsType>;

export const initializeApp = (): ThunkType => async (dispatch) => {
    await dispatch(setUserAuth());
    dispatch(actions.initializedSuccess());
};
