
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Message } from "./message";

export class MessageList {
    history : Message[];
    root: HTMLElement;
    constructor(root: HTMLElement) {
        this.root = root;
        this.history = new Array<Message>();
    }

    appendMessage(message: Message) {
        this.history.push(message);
    }

    setList(messageList: Message[]) {
        this.history = messageList;
    }

    renderList() {
        return this.history.map((record: Message) => <a className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">List group item heading</h5>
                <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">{record.author}</p>
            <small className="text-muted">{record.content}</small>
        </a>);
    }

    render() {
        const listItems = this.renderList();
        ReactDOM.render(
            listItems,
            this.root
        );
    }
}