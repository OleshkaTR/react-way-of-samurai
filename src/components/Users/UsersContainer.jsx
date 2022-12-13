import {connect} from 'react-redux';
import {follow, requestUsers, setCurrentPage, setProgress, unFollow} from '../../redux/usersReducer';
import React, {Component} from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {
    getUsers,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalCount
} from '../../redux/usersSelectors';

class UsersContainer extends Component {

    componentDidMount() {
        const {requestUsers, currentPage, pageSize} = this.props;
        requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {setCurrentPage, requestUsers, pageSize} = this.props;
        setCurrentPage(pageNumber);
        requestUsers(pageNumber, pageSize);
    }

    render() {
        return <>
                <Users
                    totalCount={this.props.totalCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    unFollow={this.props.unFollow}
                    follow={this.props.follow}
                    followingInProgress={this.props.followingInProgress}
                />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};

export default compose(
    connect(mapStateToProps,
        {
            follow,
            unFollow,
            setCurrentPage,
            setProgress,
            requestUsers,
        }
    )
)(UsersContainer);
