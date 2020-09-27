import * as signalR from "@microsoft/signalr";
import { validURL, isImage } from "./checkString";
import { parseMessage, Message, MessageType } from "./message";
import { MessageList } from "./messageUI";
import * as $ from "jquery";
import * as moment from "moment"

const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const tbUser: HTMLInputElement = document.querySelector("#tbUser");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const messages: HTMLDivElement = document.querySelector("#messages");
const currentGroupElement: HTMLDivElement = document.querySelector("#currentGroup");

let messageList = new MessageList(messages);

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

let listOfGroups = new Array<string>();

fetch("/api/groups/")
    .then(response => response.json())
    .then((result) => { result.forEach((item) => listOfGroups.push(item.name)) });

console.log("list of groups:");
console.log(listOfGroups);

listOfGroups.forEach((item) => console.log(item));
let currentGroup = "General";

currentGroupElement.innerHTML = "#" + currentGroup;

fetch("/api/history/" + currentGroup)
    .then(response => response.json())
    .then((result) => messageList.setList(result))
    .then(() => messageList.render())
    .then(() => window.scrollTo(0, document.body.scrollHeight));

let user = "";


connection.on("messageReceived", (message : Message) => {
    console.log(message);/*
    console.log(date);
    let newDate = new Date(date);
    console.log(date);*/
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
    connection.send("AddMessage", message, currentGroup)
        .then(() => tbMessage.value = "")
        .catch((err) => { console.log(err) });
    window.scrollTo(0, document.body.scrollHeight);
}


btnSend.addEventListener("click", send);