import React from 'react';
import Pagination from '../common/Pagination/Pagination';
import User from './User';

const Users = ({totalCount, pageSize, currentPage, onPageChanged, users, unFollow, follow, followingInProgress}) => {

    const renderUsersList = () => {
        return users.map(u =>
            <User
                key={u.id}
                user={u}
                followingInProgress={followingInProgress}
                unFollow={unFollow}
                follow={follow}
            />
        )
    }

    return (
        <div>
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
