import * as signalR from "@microsoft/signalr";
import { validURL, checkImage } from "./checkString";
import { parseMessage, Message, MessageType, MessageDTO } from "./message";
//import { LitElement, html, property, customElement } from 'lit-element';


const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const tbUser: HTMLInputElement = document.querySelector("#tbUser");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

let user = "";

connection.on("messageReceived", (jsonString) => {
    console.log(jsonString);
    let messages = document.createElement("div");
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



let message = { Author: "MyAuthor", Content: "This class is working!", Type: MessageType.Text }
let messages = document.getElementById("messages");
let messageDTO = new MessageDTO(message);
messages.appendChild(messageDTO.anchor);