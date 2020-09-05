
export interface Message {
    Author: string;
    Content: string;
    Type: MessageType;
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
