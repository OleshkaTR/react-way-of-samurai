import {AppStateType} from '../reduxStore';

export const getUsers = (state: AppStateType) => state.usersPage.users;
export const getPageSize = (state: AppStateType) => state.usersPage.pageSize;
export const getTotalCount = (state: AppStateType) => state.usersPage.totalCount;
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage;
export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching;
export const getFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress;
export const getUsersFilter = (state: AppStateType) => state.usersPage.filter;
