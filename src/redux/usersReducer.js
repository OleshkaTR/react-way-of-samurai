import {userAPI} from "../api/api";
import {updateObjectInArray} from "../helpers/objectHelper";

const FOLLOW = 'users/FOLLOW';
const UN_FOLLOW = 'users/UN_FOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const SET_FETCHING = 'users/SET_FETCHING';
const SET_FOLLOWING_PROGRESS = 'users/SET_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    pageSize: 50,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

export const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case UN_FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    :
                    state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};

const acceptFollow = (userId) => ({type: FOLLOW, userId});
const acceptUnFollow = (userId) => ({type: UN_FOLLOW, userId});
const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
const setFetching = (isFetching) => ({type: SET_FETCHING, isFetching});
export const setProgress = (isFetching, userId) => ({type: SET_FOLLOWING_PROGRESS, isFetching, userId});

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setFetching(true));
    let data = await userAPI.getUsers(currentPage, pageSize)
    dispatch(setFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
};

const followUnFollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(setProgress(true, userId));
    let data = await apiMethod(userId);

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(setProgress(false, userId));
};

export const follow = (userId) => async (dispatch) => {
    await followUnFollowFlow(dispatch, userId, userAPI.followUser, acceptFollow);
};

export const unFollow = (userId) => async (dispatch) => {
    await followUnFollowFlow(dispatch, userId, userAPI.unFollowUser, acceptUnFollow);
};
