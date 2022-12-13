import { profileReducer } from "./profileReducer";
import { dialogsReducer } from "./dialogsReducer";
import { sidebarReducer } from "./sidebarReduser";

export let store = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: 1,
                    message: 'Hi, how are you?',
                    likesCount: 2
                },
                {
                    id: 2,
                    message: 'It\'s my first post',
                    likesCount: 4
                },
            ],
            newPostText: 'Hello World',
        },
        dialogsPage: {
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
        },
        sidebar: {
            friends: [
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
            ],
        }
    },
    _callSubscriber() {
        console.log('state was changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sideBar = sidebarReducer(this._state.sideBar, action);

        this._callSubscriber(this._state);
    }
};

window.store = store;
