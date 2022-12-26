import {compose} from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {withAuthNavigateComponent} from '../../hoc/withAuthNavigateComponent';
import {AppStateType} from '../../redux/reduxStore';

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    };
};

export default compose(
    withAuthNavigateComponent,
    connect(mapStateToProps,
        { updateNewMessageBody: actions.updateNewMessageBody, sendMessage: actions.sendMessage }
        )
)(Dialogs);
