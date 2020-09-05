"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.element = void 0;
var React = require("react");
var ReactDOM = require("react-dom");
//export function element() { return <h1>Hello, world!</h1>; }
function element() {
    var name = 'Josh Perez';
    var element = React.createElement("h1", null,
        "Hello, ",
        name);
    ReactDOM.render(element, document.getElementById('messages'));
}
exports.element = element;
