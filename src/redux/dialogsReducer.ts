import {InferActionsTypes} from './reduxStore';

type DialogType = {
    id: number
    name: string
};
type MessageType = {
    id: number
    message: string
};

const initialState = {
    dialogs: [
        {
            id: 1,
            name: 'Oleh',
        },
        {
            id: 2,
            name: 'Sasha',
        },
        {
            id: 3,
            name: 'Mama',
        },
        {
            id: 4,
            name: 'Papa',
        },
        {
            id: 5,
            name: 'Other',
        }
    ] as Array<DialogType>,
    messages: [
        {
            id: 1,
            message: 'Hi',
        },
        {
            id: 2,
            message: 'How is your IT-Kamasutra?',
        },
        {
            id: 3,
            message: 'YO',
        },
        {
            id: 4,
            message: 'YO',
        },
        {
            id: 5,
            message: 'YO',
        },
    ] as Array<MessageType>,
    newMessageBody: '',
};

export const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'dialogs/SEND_MESSAGE':
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}]
            };
        case 'dialogs/UPDATE_NEW_MESSAGE_BODY':
            return {
                ...state,
                newMessageBody: action.body,
            };
        default:
            return state;
    }
};

export const actions = {
    sendMessage: () => ({type: 'dialogs/SEND_MESSAGE'} as const),
    updateNewMessageBody: (body: string) =>
        ({type: 'dialogs/UPDATE_NEW_MESSAGE_BODY', body} as const)
}

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
