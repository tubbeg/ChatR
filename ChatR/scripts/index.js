"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = require("@microsoft/signalr");
var message_1 = require("./message");
var messageUI_1 = require("./messageUI");
var $ = require("jquery");
var divMessages = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var tbUser = document.querySelector("#tbUser");
var btnSend = document.querySelector("#btnSend");
var messages = document.querySelector("#messages");
var messageList = new messageUI_1.MessageList(messages);
fetch("/api/history")
    .then(function (response) { return response.json(); })
    .then(function (result) {
    messageList.render(result);
});
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
$(document).ready(function () {
    main();
});
function main() {
    var user = "myId";
    connection.on("messageReceived", function (jsonString) {
        console.log(jsonString);
        var message = message_1.parseMessage(jsonString);
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
        var message = { author: user, content: tbMessage.value, type: message_1.MessageType.Text };
        if (user == "") {
            connection.send("NewUser", tbUser.value);
            user = tbUser.value;
        }
        connection.send("NewMessage", message, tbUser.value)
            .then(function () { return tbMessage.value = ""; });
    }
}
