import {connect} from 'react-redux';

import Friends from './Friends';
import {AppStateType} from '../../../redux/reduxStore';
import {MapStateToFriendsPropsType} from '../../../types/types';

let mapStateToProps = (state: AppStateType): MapStateToFriendsPropsType => {
    return {
        friends: state.sidebar.friends
    };
};

const FriendsContainer = connect(mapStateToProps, {})(Friends);

export default FriendsContainer;
