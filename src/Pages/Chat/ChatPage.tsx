import {Button} from 'antd';
import React, {FC, memo, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/chatReducer';
import {AppStateType, TypeDispatch} from '../../redux/reduxStore';
import {getMessages, getStatus} from '../../redux/selectors/chatSelectors';

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: FC = () => {
    return <div>
        <Chat/>
    </div>;
};

const Chat: FC = () => {

    const dispatch = useDispatch<TypeDispatch<AppStateType>>();
    const status = useSelector(getStatus);

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        };
    }, []);

    return <div>
        {status === 'error' && <div>Some error. Please, refresh page.</div>}
        <>
            <Messages/>
            <AddMessageForm/>
        </>
    </div>;
};

const Messages: FC = () => {
    const messages = useSelector(getMessages);
    const messagesAnchorRed = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(false);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }
    };

    useEffect(() => {
        if (isAutoScroll) messagesAnchorRed.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRed}></div>
    </div>;
};

const Message: FC<{ message: ChatMessageType }> = memo(({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: '30px'}} alt=""/>
            <strong>{message.userName}</strong>
            <br/>
            {message.message}
            <hr/>
        </div>
    );
});

const AddMessageForm: FC = () => {
    const [message, setMessage] = useState('');
    const status = useSelector(getStatus);
    const dispatch = useDispatch<TypeDispatch<AppStateType>>();

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message));
        setMessage('');
    };

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <div>
                <Button disabled={status === 'pending'} onClick={sendMessageHandler}>Send</Button>
            </div>
        </div>
    );
};

export default ChatPage;
