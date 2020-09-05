"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = require("@microsoft/signalr");
var message_1 = require("./message");
var messageUI_1 = require("./messageUI");
//import { LitElement, html, property, customElement } from 'lit-element';
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
var divMessages = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var tbUser = document.querySelector("#tbUser");
var btnSend = document.querySelector("#btnSend");
connection.on("messageReceived", function (jsonString) {
    console.log(jsonString);
    //let message = new MessageElement(parseMessage(jsonString));
    //message.render("messages");
    //let message = parseMessage(jsonString);
    //console.log(message);
    //divMessages.appendChild(messages);
    //divMessages.scrollTop = divMessages.scrollHeight;
});
connection.on("ReqHistory", function (jsonString) {
    console.log(jsonString);
});
function NewUser(userId) {
    connection.send("NewUser", userId)
        .then(function () { return tbMessage.value = ""; });
}
connection.start()
    .catch(function (err) { return document.write(err); });
tbMessage.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        send();
    }
});
btnSend.addEventListener("click", send);
function send() {
    var message = { Author: tbUser.value, Content: tbMessage.value, Type: message_1.MessageType.Text };
    if (user == "") {
        connection.send("NewUser", tbUser.value);
        user = tbUser.value;
    }
    connection.send("NewMessage", message, tbUser.value)
        .then(function () { return tbMessage.value = ""; });
}
var user = "myId";
var message = { Author: "MyAuthor", Content: "This class is working!", Type: message_1.MessageType.Text };
var element = new messageUI_1.MessageElement(message);
var anchor = document.createElement("a");
var messages = document.getElementById("messages");
messages.appendChild(anchor);
element.render(anchor);
/*let messages = document.getElementById("messages");
let messageDTO = new MessageDTO(message);
messages.appendChild(messageDTO.anchor);
*/
