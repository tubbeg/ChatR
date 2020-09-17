import * as signalR from "@microsoft/signalr";
import { validURL, checkImage } from "./checkString";
import { parseMessage, Message, MessageType } from "./message";
import { MessageList } from "./messageUI";
import * as $ from "jquery";
import * as moment from "moment"

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


connection.on("messageReceived", (message : Message, date : string) => {
    console.log(message);
    console.log(date);
    let newDate = new Date(date);
    console.log(date);
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

let date = new Date();

let otherDate = date.toISOString();
let newDate = moment(otherDate);


function send() {
    let date = new Date();
    let message: Message = {
        author: tbUser.value,
        content: tbMessage.value,
        type: MessageType.Text,
        date: moment(date)
    }
    connection.send("AddMessage", message)
        .then(() => tbMessage.value = "")
        .catch((err) => { console.log(err)});
}


btnSend.addEventListener("click", send);