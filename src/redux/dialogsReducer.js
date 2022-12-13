const UPDATE_NEW_MESSAGE_BODY = 'dialogs/UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

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
    ],
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
    ],
    newMessageBody: '',
};

export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}]
            };
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            };
        default:
            return state;
    }
};

export const sendMessage = () => ({type: SEND_MESSAGE});
export const updateNewMessageBody = (body) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body});
