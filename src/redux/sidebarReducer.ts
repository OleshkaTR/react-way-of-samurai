import {FriendType} from '../types/types';

const initialState = {
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
    ] as Array<FriendType>,
};

export type InitialState = typeof initialState;

export const sidebarReducer = (state = initialState, action: any): InitialState => {
    return state;
};
