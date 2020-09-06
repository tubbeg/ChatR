"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageElement = exports.MessageList = void 0;
var React = require("react");
var ReactDOM = require("react-dom");
//export function element() { return <h1>Hello, world!</h1>; }
/*


export class MessageList {
    constructor(data: [], messagesId: string) {
        data.forEach(record => new MessageElement(record).render(messagesId));
    }

}*/
var MessageList = /** @class */ (function () {
    function MessageList(root) {
        this.root = root;
    }
    MessageList.prototype.appendMessage = function (message) {
        this.history.push(message);
    };
    MessageList.prototype.render = function () {
        var listItems = this.history.map(function (record) {
            return React.createElement("a", { className: "list-group-item list-group-item-action flex-column align-items-start" },
                React.createElement("div", { className: "d-flex w-100 justify-content-between" },
                    React.createElement("h5", { className: "mb-1" }, "List group item heading"),
                    React.createElement("small", { className: "text-muted" }, "3 days ago")),
                React.createElement("p", { className: "mb-1" }, record.Content),
                React.createElement("small", { className: "text-muted" }, record.Author));
        });
        ReactDOM.render(listItems, this.root);
    };
    return MessageList;
}());
exports.MessageList = MessageList;
var MessageElement = /** @class */ (function () {
    function MessageElement(message) {
        this.Author = message.Author;
        this.Content = message.Content;
        this.Type = message.Type;
        this.element = React.createElement("a", { className: "list-group-item list-group-item-action flex-column align-items-start" },
            React.createElement("div", { className: "d-flex w-100 justify-content-between" },
                React.createElement("h5", { className: "mb-1" }, "List group item heading"),
                React.createElement("small", { className: "text-muted" }, "3 days ago")),
            React.createElement("p", { className: "mb-1" }, this.Content),
            React.createElement("small", { className: "text-muted" }, this.Author));
    }
    MessageElement.prototype.render = function (list) {
        ReactDOM.render(this.element, list);
    };
    return MessageElement;
}());
exports.MessageElement = MessageElement;
