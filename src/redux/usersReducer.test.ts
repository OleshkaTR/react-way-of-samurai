import {actions, InitialState, usersReducer} from './usersReducer';

let state: InitialState;

describe('UsersReducer tests', () => {
    beforeEach(() => {
        state = {
            users: [
                {
                    id: 0,
                    name: 'Oleh0',
                    followed: false,
                    photos: {small: null, large: null},
                    status: 'status0'
                }, {
                    id: 1,
                    name: 'Oleh1',
                    followed: false,
                    photos: {small: null, large: null},
                    status: 'status1'
                }, {
                    id: 2,
                    name: 'Oleh2',
                    followed: true,
                    photos: {small: null, large: null},
                    status: 'status2'
                }, {
                    id: 3,
                    name: 'Oleh3',
                    followed: true,
                    photos: {small: null, large: null},
                    status: 'status3'
                },
            ],
            pageSize: 50,
            totalCount: 0,
            currentPage: 1,
            isFetching: false,
            followingInProgress: [],
            filter: {
                term: '',
                friends: null as null | boolean,
            }
        };
    });

    test('follow success', () => {
        const newState = usersReducer(state, actions.acceptFollow(1));

        expect(newState.users[0].followed).toBeFalsy();
        expect(newState.users[1].followed).toBeTruthy();
    });

    test('onFollow success', () => {
        const newState = usersReducer(state, actions.acceptUnFollow(3));

        expect(newState.users[2].followed).toBeTruthy();
        expect(newState.users[3].followed).toBeFalsy();
    });
})
