import {AppStateType} from '../reduxStore';

export const getMessages = (state: AppStateType) => state.chat.messages;
export const getStatus = (state: AppStateType) => state.chat.status;
