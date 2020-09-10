"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageList = void 0;
var React = require("react");
var ReactDOM = require("react-dom");
var MessageList = (function () {
    function MessageList(root) {
        this.root = root;
        this.history = new Array();
    }
    MessageList.prototype.appendMessage = function (message) {
        this.history.push(message);
    };
    MessageList.prototype.setList = function (messageList) {
        this.history = messageList;
    };
    MessageList.prototype.renderList = function () {
        return this.history.map(function (record) { return React.createElement("a", { className: "list-group-item list-group-item-action flex-column align-items-start" },
            React.createElement("div", { className: "d-flex w-100 justify-content-between" },
                React.createElement("h5", { className: "mb-1" }, "List group item heading"),
                React.createElement("small", { className: "text-muted" }, record.date)),
            React.createElement("p", { className: "mb-1" }, record.author),
            React.createElement("small", { className: "text-muted" }, record.content)); });
    };
    MessageList.prototype.render = function () {
        var listItems = this.renderList();
        ReactDOM.render(listItems, this.root);
    };
    return MessageList;
}());
exports.MessageList = MessageList;
