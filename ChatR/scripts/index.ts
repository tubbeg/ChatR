import * as signalR from "@microsoft/signalr";
import { validURL, isImage } from "./checkString";
import { parseMessage, Message, MessageType } from "./message";
import { MessageList } from "./messageUI";
import * as $ from "jquery";
import * as moment from "moment";

const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const tbUser: HTMLInputElement = document.querySelector("#tbUser");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const messages: HTMLDivElement = document.querySelector("#messages");

//let messageList = new MessageList(messages);

disableButtons();
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

let listOfGroups = new Array<string>();
let listOfLists = new Array<MessageList>();
let currentGroup = "N/A";
let currentIndex = 0;

fetch("/api/groups/")
    .then(response => response.json())
    .then((result) => {
        result.forEach((item) => {
            listOfGroups.push(item.name);
            listOfLists.push(new MessageList(messages));
        })
    })
    .then(() => {
        currentIndex = listOfGroups.length - 1;
        currentGroup = listOfGroups[currentIndex];
    })
    .then(() => { currentGroupElement.innerHTML = "#" + currentGroup; })
    .then(() => getHistory(currentGroup));

function getHistory(myGroup: string) {
    disableButtons();
    fetch("/api/history/" + myGroup)
        .then(response => response.json())
        .then((result) => listOfLists[currentIndex].setList(result))
        .then(() => listOfLists[currentIndex].render())
        .then(() => window.scrollTo(0, document.body.scrollHeight))
        .then(() => enableButtons());
}


connection.on("messageReceived", (message : Message) => {
    console.log(message);
    listOfLists[currentIndex].appendMessage(message);
    listOfLists[currentIndex].render();
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
    connection.send("AddMessage", message, currentGroup)
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
    next.disabled = false;
    previous.disabled = false;
    btnSend.disabled = false;
}

function disableButtons() {
    next.disabled = true;
    previous.disabled = true;
    btnSend.disabled = true;
}