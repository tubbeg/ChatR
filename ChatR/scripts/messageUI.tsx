
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Message, MessageType } from "./message";

export class MessageList {
    //history : Message[];
    root: HTMLElement;
    constructor(root: HTMLElement) {
        this.root = root;
        //this.history = new Array<Message>();
    }

    /*appendMessage(message: Message) {
        this.history.push(message);
    }

    setList(messageList: Message[]) {
        this.history = messageList;
    }*/

    renderList(data) {
        /*let message = { Author: "MyAuthor", Content: "This class is working!", Type: MessageType.Text }
        let data = [message, message]; 
        //uncomment this to test the function
        */
        return data.map((record: Message) => <a className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">List group item heading</h5>
                <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">{record.author}</p>
            <small className="text-muted">{record.content}</small>
        </a>);
    }

    render(data) {
        const listItems = this.renderList(data);
        ReactDOM.render(
            listItems,
            this.root
        );
    }
}