import React, {Component} from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {logOut} from '../../redux/authReducer';

class HeaderContainer extends Component {

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

let mapStateToProps = (state) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {logOut})(HeaderContainer);
