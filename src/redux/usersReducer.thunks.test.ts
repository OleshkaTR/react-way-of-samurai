import {actions, follow, unFollow} from './usersReducer';
import {userAPI} from '../api/usersApi';
import {APIResponseType, ResultCodeEnum} from '../api/api';

jest.mock('../api/usersApi');

const userApiMock = userAPI as jest.Mocked<typeof userAPI>;
const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
};
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

describe('UsersReducer thunks testing', () => {

    beforeEach(() => {
        dispatchMock.mockClear();
        getStateMock.mockClear();
        userApiMock.followUser.mockClear();
        userApiMock.unFollowUser.mockClear();
    });

    test('success follow thunk', async () => {
        userApiMock.followUser.mockResolvedValue(Promise.resolve(result));
        const thunk = follow(1);

        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setProgress(true, 1));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.acceptFollow(1));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setProgress(false, 1));
    });

    test('success unFollow thunk', async () => {
        userApiMock.unFollowUser.mockResolvedValue(Promise.resolve(result));
        const thunk = unFollow(1);

        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setProgress(true, 1));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.acceptUnFollow(1));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setProgress(false, 1));
    });
})
