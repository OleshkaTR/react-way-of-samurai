import {Dispatch} from 'redux';

import {updateObjectInArray} from '../helpers/objectHelper';
import {UserType} from '../types/types';
import {ThunkAction} from 'redux-thunk';
import {AppStateType, InferActionsTypes} from './reduxStore';
import {userAPI} from '../api/usersApi';
import {APIResponseType, ResultCodeEnum} from '../api/api';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users ids
    filter: {
        term: '',
        friends: null as null | boolean
    }
};

export const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'user/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case 'user/UN_FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case 'user/SET_USERS':
            return {
                ...state,
                users: action.users
            };
        case 'user/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            };
        case 'user/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalCount: action.totalCount
            };
        case 'user/SET_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case 'user/SET_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    :
                    state.followingInProgress.filter(id => id !== action.userId)
            };
        case 'user/SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        default:
            return state;
    }
};

export const actions = {
    acceptFollow: (userId: number) => ({type: 'user/FOLLOW', userId} as const),
    acceptUnFollow: (userId: number) => ({type: 'user/UN_FOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'user/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({
        type: 'user/SET_CURRENT_PAGE',
        currentPage
    } as const),
    setTotalUsersCount: (totalCount: number) => ({
        type: 'user/SET_TOTAL_USERS_COUNT',
        totalCount
    } as const),
    setFetching: (isFetching: boolean) => ({type: 'user/SET_FETCHING', isFetching} as const),
    setProgress: (isFetching: boolean, userId: number) => (
        {type: 'user/SET_FOLLOWING_PROGRESS', isFetching, userId} as const
    ),
    setFilter: (filter: FilterType) => ({type: 'user/SET_FILTER', payload: filter} as const)
};

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>
    async (dispatch) => {
        dispatch(actions.setFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter));

        let data = await userAPI.getUsers(currentPage, pageSize, filter.term, filter.friends);
        dispatch(actions.setFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    };

const _followUnFollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   actionCreator: (userId: number)
                                       => ActionsTypes) => {
    dispatch(actions.setProgress(true, userId));
    let data = await apiMethod(userId);

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.setProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnFollowFlow(dispatch, userId, userAPI.followUser, actions.acceptFollow);
};

export const unFollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnFollowFlow(dispatch, userId, userAPI.unFollowUser, actions.acceptUnFollow);
};

type ActionsTypes = InferActionsTypes<typeof actions>;
export type FilterType = typeof initialState.filter;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
export type InitialState = typeof initialState;
