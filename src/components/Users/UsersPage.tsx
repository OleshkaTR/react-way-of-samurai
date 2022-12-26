import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import Users from './Users';
import {getIsFetching} from '../../redux/selectors/usersSelectors';
import Preloader from '../common/Preloader/Preloader';

type UsersPagePropsTy = {
    pageTitle: string
};

const UsersPage: FC<UsersPagePropsTy> = (props) => {
    const isFetching = useSelector(getIsFetching);

    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader/> : false}
        <Users/>
    </>;
};

export default UsersPage;
