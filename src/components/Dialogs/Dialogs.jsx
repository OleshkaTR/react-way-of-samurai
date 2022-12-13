import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Messages from './Messages/Messages';
import {Navigate} from 'react-router-dom';

const Dialogs = ({ updateNewMessageBody, sendMessage, dialogsPage, isAuth }) => {

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

    let onMessageChange = (e) => {
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
                    <button
                        onClick={ addNewDialog }
                    >
                        Add dialog
                    </button>
                </div>
            </div>

        </section>
    );
};

export default Dialogs;
