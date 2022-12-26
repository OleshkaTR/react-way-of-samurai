import {chatApi, ChatMessageApiType, StatusType} from '../api/chatApi';
import {BaseThunkType, InferActionsTypes} from './reduxStore';
import {Dispatch} from 'redux';
import {v1} from 'uuid';

type ChatMessageType = ChatMessageApiType & {id: string}

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

export const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload
                    .map(m => ({...m, id: v1()}))]
                    .filter((m, i, array) => array.length - 100)
            };
        case 'chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload
            };
        default:
            return state;
    }
};

const actions = {
    messagesReceived: (messages: ChatMessageApiType[]) => ({type: 'chat/MESSAGES_RECEIVED', payload: messages} as const),
    statusChanged: (status: StatusType) => ({type: 'chat/STATUS_CHANGED', payload: status} as const),
};

let _newMessageHandler: ((messages: ChatMessageApiType[]) => void) | null = null;
const newMessageHandler = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => dispatch(actions.messagesReceived(messages));
    }

    return _newMessageHandler;
};

let _newStatusHandler: ((status: StatusType) => void) | null = null;
const newStatusHandler = (dispatch: Dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status) => dispatch(actions.statusChanged(status));
    }

    return _newStatusHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start();
    chatApi.subscribe('messageReceived', newMessageHandler(dispatch));
    chatApi.subscribe('statusChanged', newStatusHandler(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unsubscribe('messageReceived', newMessageHandler(dispatch));
    chatApi.unsubscribe('statusChanged', newStatusHandler(dispatch));
    chatApi.stop();
};
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatApi.send(message);
};

type ThunkType = BaseThunkType<ActionsType>;
