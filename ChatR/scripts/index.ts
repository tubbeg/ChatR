import * as signalR from "@microsoft/signalr";
import { validURL, checkImage } from "./checkString";

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

interface Message {
    author: string,
    content: string,
    type: string,
}

connection.on("messageReceived", (message : Message) => {
    let messages = document.createElement("div");

    messages.innerHTML =
        `<div class="message-author">${message.author}</div><div>${message.content}</div>`;

    divMessages.appendChild(messages);
    divMessages.scrollTop = divMessages.scrollHeight;
});

connection.start().catch(err => document.write(err));

tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        send();
    }
});

btnSend.addEventListener("click", send);

function send() {
    let message: Message = { author: "", content: tbMessage.value, type: "" }
    connection.send("newMessage", message)
        .then(() => tbMessage.value = "");
}

