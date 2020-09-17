
export interface Message {
    author: string;
    content: string;
    type: MessageType;
    date: moment.Moment;
}


export enum MessageType {
    Image,
    Video,
    Link,
    Text
}

export function parseMessage(jsonString): Message {
    let jsonObj: any = JSON.parse(jsonString);
    let message: Message = <Message>jsonObj;
    return message;
}
