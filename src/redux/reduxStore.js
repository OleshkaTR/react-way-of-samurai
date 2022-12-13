import { combineReducers, createStore, applyMiddleware } from 'redux';
import { profileReducer } from './profileReducer';
import { dialogsReducer } from './dialogsReducer';
import { sidebarReducer } from './sidebarReduser';
import { usersReducer } from './usersReducer';
import { authReducer } from './authReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {appReducer} from './appReducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

export let store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);

window.store = store;
