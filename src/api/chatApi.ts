let subscribers = {
    'messageReceived': [] as MessagesReceivedSubscriberType[],
    'statusChanged' : [] as StatusChangedSubscriberType[]
};

let ws: WebSocket | null = null;
type EventsNamesType = 'messageReceived' | 'statusChanged';

const closeHandler = () => {
    notifySubscribersAboutStatus('pending');
    setTimeout(createChannel, 3000);
};
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers['messageReceived'].forEach(s => s(newMessages));
};
const openHandler = () => {
    notifySubscribersAboutStatus('ready');
};
const errorHandler = () => {
    notifySubscribersAboutStatus('error');
};
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
};
const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['statusChanged'].forEach(s => s(status));
};

function createChannel() {
    cleanUp();
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending');
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
}

export const chatApi = {
    start: () => createChannel(),
    stop: () => {
        subscribers['messageReceived'] = [];
        subscribers['statusChanged'] = [];
        cleanUp();
        ws?.close();
    },
    subscribe: (eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) => {

        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
        };
    },
    unsubscribe: (eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) => {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
    },
    send: (message: string) => {
        ws?.send(message);
    },
};

type MessagesReceivedSubscriberType = (messages: ChatMessageApiType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;
export type ChatMessageApiType = {
    message: string
    photo: string
    userId: number
    userName: string
};
export type StatusType = 'pending' | 'ready' | 'error';
