import * as signalR from "@microsoft/signalr";
import { validURL, checkImage } from "./checkString";
import { parseMessage, Message, MessageType } from "./message";
import { MessageList } from "./messageUI";

//import { LitElement, html, property, customElement } from 'lit-element';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const tbUser: HTMLInputElement = document.querySelector("#tbUser");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");


connection.on("messageReceived", (jsonString) => {
    console.log(jsonString);
    //let message = new MessageElement(parseMessage(jsonString));
    //message.render("messages");
    //let message = parseMessage(jsonString);
    //console.log(message);
    //divMessages.appendChild(messages);
    //divMessages.scrollTop = divMessages.scrollHeight;
});

connection.on("ReqHistory", (jsonString) => {
    console.log(jsonString);
});


function NewUser(userId : string) {
    connection.send("NewUser", userId)
        .then(() => tbMessage.value = "");
}

connection.start()
    .catch(err => document.write(err));

tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        send();
    }
});

btnSend.addEventListener("click", send);

function send() {
    let message: Message = { Author: tbUser.value, Content: tbMessage.value, Type: MessageType.Text }
    if (user == "") {
        connection.send("NewUser", tbUser.value);
        user = tbUser.value;
    }
    connection.send("NewMessage", message, tbUser.value)
        .then(() => tbMessage.value = "");
}



let user = "myId";

//let message = { Author: "MyAuthor", Content: "This class is working!", Type: MessageType.Text }
//let element = new MessageElement(message);
let messages = document.getElementById("messages");
let messageList = new MessageList(messages);
let messageData = fetch("/api/messagehistory")
    .then(response => response.json())
    .then((result) => {
        console.log(result);
        result.forEach(record => {
            messageList.appendMessage(record);
        });
    })
    .then(() => messageList.render());


