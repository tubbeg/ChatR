
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Message } from "./message";

export class MessageList {
    history: [Message];
    root: HTMLElement;
    constructor(root: HTMLElement) {
        this.root = root;
    }

    appendMessage(message: Message) {
        this.history.push(message);
    }

    render() {
        const listItems = this.history.map((record: Message) =>
            <a className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">List group item heading</h5>
                    <small className="text-muted">3 days ago</small>
                </div>
                <p className="mb-1">
                    {record.Content}
                </p>
                <small className="text-muted">
                    {record.Author}
                </small>
            </a>
        );
        ReactDOM.render(
            listItems,
            this.root
        );
    }
}