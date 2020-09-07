"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageList = void 0;
var React = require("react");
var ReactDOM = require("react-dom");
var MessageList = (function () {
    function MessageList(root) {
        this.root = root;
    }
    MessageList.prototype.renderList = function (data) {
        return data.map(function (record) { return React.createElement("a", { className: "list-group-item list-group-item-action flex-column align-items-start" },
            React.createElement("div", { className: "d-flex w-100 justify-content-between" },
                React.createElement("h5", { className: "mb-1" }, "List group item heading"),
                React.createElement("small", { className: "text-muted" }, "3 days ago")),
            React.createElement("p", { className: "mb-1" }, record.Author),
            React.createElement("small", { className: "text-muted" }, record.Content)); });
    };
    MessageList.prototype.render = function (data) {
        var listItems = this.renderList(data);
        ReactDOM.render(listItems, this.root);
    };
    return MessageList;
}());
exports.MessageList = MessageList;
