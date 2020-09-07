import * as signalR from "@microsoft/signalr";
import { validURL, checkImage } from "./checkString";
import { parseMessage, Message, MessageType } from "./message";
import { MessageList } from "./messageUI";
import * as $ from "jquery";

//import { LitElement, html, property, customElement } from 'lit-element';

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const tbUser: HTMLInputElement = document.querySelector("#tbUser");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const messages: HTMLDivElement = document.querySelector("#messages");

let messageList = new MessageList(messages);
//let message = { Author: "MyAuthor", Content: "This class is working!", Type: MessageType.Text }
fetch("/api/history")
    .then(response => response.json())
    .then((result) => {
        //console.log(result);
        //messageList.setList(result);
        /*result.forEach(record => {
            let rec = JSON.stringify(record);
            //console.log(rec);
            let message = parseMessage(rec);
            console.log(message.Author);
            console.log(message.Content);
            messageList.appendMessage(message);
        });
        let message = { Author: "MyAuthor", Content: "This class is working!", Type: MessageType.Text }
        //let message = { Author: result[0].Author.toString(), Content: result[0].Content.toString(), Type: MessageType.Text }
        let data = [message, message];
        console.log(result[0]);
        console.log(result[0][Object.keys(result[0])[0]])
        console.log("keys: ")
        console.log(Object.keys(result[0]))
        console.log("key parameter: ")
        console.log(Object.keys(result[0])[0])
        console.log(result[0].author); // <=== HITTADE FELET, ska vara små bokstav av nån jävla anledning?
        //let message2 = new MessageDTO(result[0]);
        //let data2 = [message2, message2]*/
        messageList.render(result);
        //messageList.render(data2);
    });
    //.then((result : Message[]) => messageList.render(result));

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

$(document).ready(() => {
    main();
});


function main() {

    let user = "myId";

    connection.on("messageReceived", (jsonString) => {
        console.log(jsonString);
        let message = parseMessage(jsonString);
        //messageList.appendMessage(message);
        //messageList.render();
    });

    connection.on("ReqHistory", (jsonString) => {
        console.log(jsonString);
    });


    function NewUser(userId: string) {
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
        let message: Message = { author: user, content: tbMessage.value, type: MessageType.Text }
        if (user == "") {
            connection.send("NewUser", tbUser.value);
            user = tbUser.value;
        }
        connection.send("NewMessage", message, tbUser.value)
            .then(() => tbMessage.value = "");
    }
}

