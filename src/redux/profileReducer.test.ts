import {actions, profileReducer} from './profileReducer';
import {ProfileType} from '../types/types';

const state = {
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
    profile: null as ProfileType | null,
    status: ''
};

describe('Test profile reducer', () => {
    test('the length  of post should be increased', () => {
        let action = actions.updateNewPostText('it-kamasutra');

        let newState = profileReducer(state, action);
        expect(newState.newPostText.length).not.toBeNull();
    });

    test('the text`s of latest post should be correct', () => {
        let action = actions.addPost();

        let newState = profileReducer(state, action);
        expect(newState.posts[2].message).toBe('Hello World');
    });

    test('after deleting length of messages should be decreased', () => {
        let action = actions.deletePost(1);
        let newState = profileReducer(state, action);
        expect(newState.posts.length).toBe(1);
    });

    test(`after deleting length of messages should't be decreased if id is incorrect`, () => {
        let action = actions.deletePost(10);
        let newState = profileReducer(state, action);
        expect(newState.posts.length).toBe(2);
    });
});
