
import * as React from "react";
import * as ReactDOM from "react-dom";

//export function element() { return <h1>Hello, world!</h1>; }


export function element() {
    let name = 'Josh Perez';
    let element = <h1>Hello, {name}</h1>;
    ReactDOM.render(
        element,
        document.getElementById('messages')
    );
}