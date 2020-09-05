"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageElement = void 0;
var React = require("react");
var ReactDOM = require("react-dom");
//export function element() { return <h1>Hello, world!</h1>; }
/*


export class MessageList {
    constructor(data: [], messagesId: string) {
        data.forEach(record => new MessageElement(record).render(messagesId));
    }

}*/
var MessageElement = /** @class */ (function () {
    function MessageElement(message) {
        this.Author = message.Author;
        this.Content = message.Content;
        this.Type = message.Type;
        this.divider = React.createElement("div", { className: "d-flex w-100 justify-content-between" },
            React.createElement("h5", { className: "mb-1" }, "List group item heading"),
            React.createElement("small", { className: "text-muted" }, "3 days ago"));
        this.paragraph = React.createElement("p", { className: "mb-1" }, this.Content);
        this.small = React.createElement("small", { className: "text-muted" }, this.Author);
    }
    MessageElement.prototype.render = function (anchor) {
        anchor.className = "list-group-item list-group-item-action flex-column align-items-start";
        ReactDOM.render(this.divider, this.paragraph, this.small, anchor);
    };
    return MessageElement;
}());
exports.MessageElement = MessageElement;
