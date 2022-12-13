import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {logIn} from "../../redux/authReducer";
import Login from "./Login";

const LoginContainer = (props) => {
    return (
        <Login {...props} />
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default compose(
    connect(mapStateToProps, { logIn })
)(LoginContainer);
