import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';

export const withAuthNavigateComponent = (Component) => {

    const NavigateComponent = (props) => {
        if (!props.isAuth) return <Navigate to='/login'/>
        return <Component {...props}/>;
    }

    let mapStateToPropsForNavigate = (state) => ({
        isAuth: state.auth.isAuth
    });

    return connect(mapStateToPropsForNavigate)(NavigateComponent);
};
