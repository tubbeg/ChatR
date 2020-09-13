import * as signalR from "@microsoft/signalr";
import { validURL, checkImage } from "./checkString";
import { parseMessage, Message, MessageType } from "./message";
import { MessageList } from "./messageUI";
import * as $ from "jquery";


const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const tbUser: HTMLInputElement = document.querySelector("#tbUser");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const messages: HTMLDivElement = document.querySelector("#messages");

let messageList = new MessageList(messages);

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();


console.log("trying to find connection")

console.log(fetch("/api/history")
    .then(response => response.json())
    .then((result) => messageList.setList(result))
    .then(() => messageList.render())
    .then(() => window.scrollTo(0, document.body.scrollHeight)));

let user = "";


connection.on("messageReceived", (message : Message) => {
    console.log(message);
    messageList.appendMessage(message);
    messageList.render();
    window.scrollTo(0, document.body.scrollHeight);
});

connection.on("ReqHistory", (jsonString) => {
    console.log(jsonString);
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
    let message: Message = {
        author: tbUser.value,
        content: tbMessage.value,
        type: MessageType.Text,
        date: null
    }
    /*if (user == "") {
        connection.send("NewUser", tbUser.value);
        user = tbUser.value;
    }*/

    connection.send("AddToGroup", tbUser.value)
        .then(() => tbMessage.value = "")
        .catch((err) => { console.log(err) });
    console.log("sending information: ", message);
    console.log("with user: " + tbUser.value);
    connection.send("SendNewMessage", message, tbUser.value)
        .then(() => tbMessage.value = "")
        .catch((err) => { console.log(err)});
}


btnSend.addEventListener("click", send);