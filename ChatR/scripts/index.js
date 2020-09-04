"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = require("@microsoft/signalr");
var message_1 = require("./message");
//import { LitElement, html, property, customElement } from 'lit-element';
var divMessages = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var tbUser = document.querySelector("#tbUser");
var btnSend = document.querySelector("#btnSend");
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
var user = "";
connection.on("messageReceived", function (jsonString) {
    console.log(jsonString);
    var messages = document.createElement("div");
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
var message = { Author: "MyAuthor", Content: "This class is working!", Type: message_1.MessageType.Text };
var messages = document.getElementById("messages");
var messageDTO = new message_1.MessageDTO(message);
messages.appendChild(messageDTO.anchor);
