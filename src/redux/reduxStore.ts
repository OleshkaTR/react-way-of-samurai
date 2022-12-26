import {combineReducers, createStore, applyMiddleware, Action, AnyAction} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { profileReducer } from './profileReducer';
import { dialogsReducer } from './dialogsReducer';
import { sidebarReducer } from './sidebarReducer';
import { usersReducer } from './usersReducer';
import { authReducer } from './authReducer';
import {appReducer} from './appReducer';
import {chatReducer} from './chatReducer';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;
export type TypeDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
