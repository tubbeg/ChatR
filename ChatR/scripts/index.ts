﻿import * as signalR from "@microsoft/signalr";
import { validURL, isImage } from "./checkString";
import { parseMessage, Message, MessageType } from "./message";
import { MessageList } from "./messageUI";
import * as $ from "jquery";
import * as moment from "moment";

const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const tbUser: HTMLInputElement = document.querySelector("#tbUser");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const messages: HTMLDivElement = document.querySelector("#messages");

let messageList = new MessageList(messages);

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

function getHistory() {
    fetch("/api/history/")
        .then(response => response.json())
        .then((result) => messageList.setList(result))
        .then(() => messageList.render())
        .then(() => window.scrollTo(0, document.body.scrollHeight));
}


connection.on("messageReceived", (message : Message) => {
    console.log(message);
    messageList.appendMessage(message);
    messageList.render();
});

connection.start()
    .then(() => { console.log("connection started");})
    .catch(err => document.write(err));

tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        send();
    }
});

function send() {
    if (hasNullValues())
        return;
    let contentType = MessageType.Text;
    if (isImage(tbMessage.value))
        contentType = MessageType.Image;
    let date = new Date();
    let message: Message = {
        author: tbUser.value,
        content: tbMessage.value,
        type: contentType,
        date: moment(date)
    }
    connection.send("AddMessage", message)
        .then(() => tbMessage.value = "")
        .catch((err) => { console.log(err) });
    window.scrollTo(0, document.body.scrollHeight);
}

function hasNullValues() : boolean {
    if (tbMessage.value == "")
        return true;
    if (tbUser.value == "")
        return true;
    if (tbUser.value == null)
        return true;
    if (tbMessage.value == null)
        return true;
    return false;
}

btnSend.addEventListener("click", send);

function enableButtons() {
    btnSend.disabled = false;
}

function disableButtons() {
    btnSend.disabled = true;
}


disableButtons();
getHistory();
enableButtons();