
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Message, MessageType } from "./message";

//export function element() { return <h1>Hello, world!</h1>; }
/*


export class MessageList {
    constructor(data: [], messagesId: string) {
        data.forEach(record => new MessageElement(record).render(messagesId));
    }

}*/



export class MessageElement implements Message{
    Author: string;
    Content: string;
    Type: MessageType;
    divider: JSX.Element;
    paragraph: JSX.Element;
    small: JSX.Element;
    constructor(message: Message) {
        this.Author = message.Author;
        this.Content = message.Content;
        this.Type = message.Type;
            this.divider = <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">List group item heading</h5>
                <small className="text-muted">3 days ago</small>
        </div>;
        this.paragraph = < p className="mb-1" >
            {this.Content}
        </p>;
        this.small = <small className="text-muted">
            {this.Author}
        </small>;
    }

    render(anchor: HTMLAnchorElement) {
        anchor.className = "list-group-item list-group-item-action flex-column align-items-start";
        ReactDOM.render(
            this.divider,
            anchor
        );
    }

}
