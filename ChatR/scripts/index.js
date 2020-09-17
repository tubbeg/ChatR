"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = require("@microsoft/signalr");
var message_1 = require("./message");
var messageUI_1 = require("./messageUI");
var moment = require("moment");
var tbMessage = document.querySelector("#tbMessage");
var tbUser = document.querySelector("#tbUser");
var btnSend = document.querySelector("#btnSend");
var messages = document.querySelector("#messages");
var messageList = new messageUI_1.MessageList(messages);
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
console.log("trying to find connection");
console.log(fetch("/api/history")
    .then(function (response) { return response.json(); })
    .then(function (result) { return messageList.setList(result); })
    .then(function () { return messageList.render(); })
    .then(function () { return window.scrollTo(0, document.body.scrollHeight); }));
var user = "";
connection.on("messageReceived", function (message, date) {
    console.log(message);
    console.log(date);
    var newDate = new Date(date);
    console.log(date);
    messageList.appendMessage(message);
    messageList.render();
    window.scrollTo(0, document.body.scrollHeight);
});
connection.on("ReqHistory", function (jsonString) {
    console.log(jsonString);
});
connection.start()
    .then(function () { console.log("connection started"); })
    .catch(function (err) { return document.write(err); });
tbMessage.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        send();
    }
});
var date = new Date();
var otherDate = date.toISOString();
var newDate = moment(otherDate);
function send() {
    var date = new Date();
    var message = {
        author: tbUser.value,
        content: tbMessage.value,
        type: message_1.MessageType.Text,
        date: moment(date)
    };
    connection.send("AddMessage", message)
        .then(function () { return tbMessage.value = ""; })
        .catch(function (err) { console.log(err); });
}
btnSend.addEventListener("click", send);
