import React, {ChangeEvent, FC} from 'react';
import {Navigate} from 'react-router-dom';

import DialogItem from './DialogItem/DialogItem';
import Messages from './Messages/Messages';
import classes from './Dialogs.module.css';
import {InitialStateType} from '../../redux/dialogsReducer';
import { Button } from 'antd';

type PropsType = {
    dialogsPage: InitialStateType
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
    isAuth: boolean
};

const Dialogs: FC<PropsType> = ({ updateNewMessageBody, sendMessage, dialogsPage, isAuth }) => {

    const { dialogs, messages, newMessageBody } = dialogsPage;

    let dialogsElements = dialogs
        .map((d, index) =>
            <DialogItem
                key={index}
                id={d.id}
                name={d.name}
            />
        );
    let messagesElements = messages
        .map((m, index) =>
            <Messages
                key={index}
                message={m.message}
            />
        );

    let addNewDialog = () => {
        sendMessage();
    };

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value;
        updateNewMessageBody(body);
    };

    if(!isAuth) return <Navigate to='/login'/>;

    return (
        <section className={classes._wrapper}>

            <div className={classes._items}>
                { dialogsElements }
            </div>

            <div className={classes._messages}>
                <div>{ messagesElements }</div>

                <div>
                    <textarea
                        value={ newMessageBody }
                        onChange={ onMessageChange }
                        placeholder='Enter your message'
                        name='field'
                    />
                </div>

                <div>
                    <Button
                        onClick={ addNewDialog }
                    >
                        Add dialog
                    </Button>
                </div>
            </div>

        </section>
    );
};

export default Dialogs;
