"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = require("@microsoft/signalr");
var checkString_1 = require("./checkString");
var message_1 = require("./message");
var messageUI_1 = require("./messageUI");
var moment = require("moment");
var tbMessage = document.querySelector("#tbMessage");
var tbUser = document.querySelector("#tbUser");
var btnSend = document.querySelector("#btnSend");
var messages = document.querySelector("#messages");
var currentGroupElement = document.querySelector("#currentGroup");
var previous = document.querySelector("#previous");
var next = document.querySelector("#next");
disableButtons();
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
var listOfGroups = new Array();
var listOfLists = new Array();
var currentGroup = "N/A";
var currentIndex = 0;
fetch("/api/groups/")
    .then(function (response) { return response.json(); })
    .then(function (result) {
    result.forEach(function (item) {
        listOfGroups.push(item.name);
        listOfLists.push(new messageUI_1.MessageList(messages));
    });
})
    .then(function () {
    currentIndex = listOfGroups.length - 1;
    currentGroup = listOfGroups[currentIndex];
})
    .then(function () { currentGroupElement.innerHTML = "#" + currentGroup; })
    .then(function () { return getHistory(currentGroup); });
function getHistory(myGroup) {
    disableButtons();
    fetch("/api/history/" + myGroup)
        .then(function (response) { return response.json(); })
        .then(function (result) { return listOfLists[currentIndex].setList(result); })
        .then(function () { return listOfLists[currentIndex].render(); })
        .then(function () { return window.scrollTo(0, document.body.scrollHeight); })
        .then(function () { return enableButtons(); });
}
connection.on("messageReceived", function (message) {
    console.log(message);
    listOfLists[currentIndex].appendMessage(message);
    listOfLists[currentIndex].render();
});
connection.start()
    .then(function () { console.log("connection started"); })
    .catch(function (err) { return document.write(err); });
tbMessage.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        send();
    }
});
function send() {
    if (hasNullValues())
        return;
    var contentType = message_1.MessageType.Text;
    if (checkString_1.isImage(tbMessage.value))
        contentType = message_1.MessageType.Image;
    var date = new Date();
    var message = {
        author: tbUser.value,
        content: tbMessage.value,
        type: contentType,
        date: moment(date)
    };
    connection.send("AddMessage", message, currentGroup)
        .then(function () { return tbMessage.value = ""; })
        .catch(function (err) { console.log(err); });
    window.scrollTo(0, document.body.scrollHeight);
}
function hasNullValues() {
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
function updateCurrentGroup() {
    currentGroupElement.innerHTML = "#" + currentGroup;
    if (listOfLists[currentIndex].history.length < 1)
        getHistory(currentGroup);
    listOfLists[currentIndex].render();
}
btnSend.addEventListener("click", send);
next.addEventListener("click", function () {
    if (currentIndex > 0)
        currentIndex = currentIndex - 1;
    else
        currentIndex = listOfGroups.length - 1;
    currentGroup = listOfGroups[currentIndex];
    updateCurrentGroup();
});
previous.addEventListener("click", function () {
    if (currentIndex < (listOfGroups.length - 1))
        currentIndex = currentIndex + 1;
    else
        currentIndex = 0;
    currentGroup = listOfGroups[currentIndex];
    updateCurrentGroup();
});
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
