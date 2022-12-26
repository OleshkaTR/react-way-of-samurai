import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Pagination from '../common/Pagination/Pagination';
import User from './User';
import UsersSearchForm from './UsersSearchForm';
import {FilterType, follow, requestUsers, unFollow} from '../../redux/usersReducer';
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalCount,
    getUsers,
    getUsersFilter
} from '../../redux/selectors/usersSelectors';
import {AppStateType, TypeDispatch} from '../../redux/reduxStore';

type PropsType = {}

const Users: FC<PropsType> = (props) => {

    const users = useSelector(getUsers);
    const totalCount = useSelector(getTotalCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch<TypeDispatch<AppStateType>>();

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter));
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    };

    const unFollowUser = (userId: number) => {
        dispatch(unFollow(userId));
    };

    const followUser = (userId: number) => {
        dispatch(follow(userId));
    };

    const renderUsersList = () => {
        return users.map(u =>
            <User
                key={u.id}
                user={u}
                followingInProgress={followingInProgress}
                unFollow={unFollowUser}
                follow={followUser}
            />
        );
    };

    return (
        <div>
            <UsersSearchForm
                onFilterChanged={onFilterChanged}
                filter={filter}
            />
            <Pagination
                totalCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />
            {renderUsersList()}
        </div>
    );
};

export default Users;
