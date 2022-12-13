import React from 'react';
import { updateNewMessageBody, sendMessage } from '../../redux/dialogsReducer';
import Dialogs from "./Dialogs";
import { connect } from 'react-redux';
import {withAuthNavigateComponent} from '../../hoc/withAuthNavigateComponent';
import {compose} from 'redux';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    };
};

export default compose(
    withAuthNavigateComponent,
    connect(mapStateToProps, { updateNewMessageBody, sendMessage })
)(Dialogs);
