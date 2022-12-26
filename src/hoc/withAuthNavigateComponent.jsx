import React from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';

let mapStateToPropsForNavigate = (state) => ({
    isAuth: state.auth.isAuth
});
export const withAuthNavigateComponent = (Component) => {

    const NavigateComponent = (props) => {
        if (!props.isAuth) return <Navigate to='/login'/>
        return <Component {...props}/>;
    }

    return connect(mapStateToPropsForNavigate)(NavigateComponent);
};

