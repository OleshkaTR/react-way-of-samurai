import {addPost, profileReducer, deletePost} from "./profileReducer";

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
};

describe('Test profile reducer', () => {
    test('the length  of post should be increased', () => {
        let action = addPost('it-kamasutra');

        let newState = profileReducer(state, action);
        expect(newState.posts.length).toBe(3);
    });

    test('the text`s of latest post should be correct', () => {
        let action = addPost();

        let newState = profileReducer(state, action);
        expect(newState.posts[2].message).toBe('Hello World');
    });

    test('after deleting length of messages should be decreased', () => {
        let action = deletePost(1);
        let newState = profileReducer(state, action);
        expect(newState.posts.length).toBe(1);
    });

    test(`after deleting length of messages should't be decreased if id is incorrect`, () => {
        let action = deletePost('1');
        let newState = profileReducer(state, action);
        expect(newState.posts.length).toBe(2);
    });
});
