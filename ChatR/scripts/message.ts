import { create } from "domain";

export interface Message {
    Author: string;
    Content: string;
    Type: MessageType;
}


export enum MessageType {
    Image,
    Video,
    Link,
    Text
}

export function parseMessage(jsonString): Message {
    let jsonObj: any = JSON.parse(jsonString);
    let message: Message = <Message>jsonObj;
    return message;
}



export class MessageDTO implements Message {
    Author: string;
    Content: string;
    Type: MessageType;
    anchor: HTMLAnchorElement;
    //the css should a parameter for the constructor
    //Right now, updating this class for changes in
    //the future is going to be quite painful
    constructor(message: Message) {
        this.Author = message.Author;
        this.Content = message.Content;
        this.Type = message.Type;
        this.anchor = this.createAnchor();
    }

    createAnchor(): HTMLAnchorElement {
        let anchor = document.createElement("a");
        anchor.className = "list-group-item list-group-item-action flex-column align-items-start";
        anchor.appendChild(this.createDivider());
        let paragraphContent = document.createElement("p");
        paragraphContent.className = "mb-1";
        paragraphContent.innerHTML = this.Content;
        anchor.appendChild(paragraphContent);
        let smallAuthor = document.createElement("small");
        smallAuthor.className = "text-muted";
        smallAuthor.innerHTML = this.Author;
        anchor.appendChild(smallAuthor);
        return anchor;
    }
    
    createDivider() : HTMLDivElement  {

        let divider = document.createElement("div");
        divider.className = "d-flex w-100 justify-content-between";
        let header = document.createElement("h5");
        header.className = "mb-1";
        header.innerHTML = "Stuff here";
        let smallDate = document.createElement("small");
        smallDate.className = "text-muted";
        smallDate.innerHTML = "3 days ago";
        divider.appendChild(header);
        divider.appendChild(smallDate);
        return divider;
    }

}
