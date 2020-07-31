import * as signalR from "@microsoft/signalr";
import { validURL, checkImage } from "./checkString";
import { parseMessage, Message, MessageType } from "./message";

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

connection.on("messageReceived", (jsonString : string) => {
    let messages = document.createElement("div");
    let message = parseMessage(jsonString);
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
    let message: Message = { author: username.toString(), content: tbMessage.value, type: MessageType.Text}
    connection.send("newMessage", message)
        .then(() => tbMessage.value = "");
}

