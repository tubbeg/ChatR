"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDTO = exports.parseMessage = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Image"] = 0] = "Image";
    MessageType[MessageType["Video"] = 1] = "Video";
    MessageType[MessageType["Link"] = 2] = "Link";
    MessageType[MessageType["Text"] = 3] = "Text";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
function parseMessage(jsonString) {
    var jsonObj = JSON.parse(jsonString);
    var message = jsonObj;
    return message;
}
exports.parseMessage = parseMessage;
var MessageDTO = /** @class */ (function () {
    //the css should a parameter for the constructor
    //Right now, updating this class for changes in
    //the future is going to be quite painful
    function MessageDTO(message) {
        this.Author = message.Author;
        this.Content = message.Content;
        this.Type = message.Type;
        this.anchor = this.createAnchor();
    }
    MessageDTO.prototype.createAnchor = function () {
        var anchor = document.createElement("a");
        anchor.className = "list-group-item list-group-item-action flex-column align-items-start";
        anchor.appendChild(this.createDivider());
        var paragraphContent = document.createElement("p");
        paragraphContent.className = "mb-1";
        paragraphContent.innerHTML = this.Content;
        anchor.appendChild(paragraphContent);
        var smallAuthor = document.createElement("small");
        smallAuthor.className = "text-muted";
        smallAuthor.innerHTML = this.Author;
        anchor.appendChild(smallAuthor);
        return anchor;
    };
    MessageDTO.prototype.createDivider = function () {
        var divider = document.createElement("div");
        divider.className = "d-flex w-100 justify-content-between";
        var header = document.createElement("h5");
        header.className = "mb-1";
        header.innerHTML = "Stuff here";
        var smallDate = document.createElement("small");
        smallDate.className = "text-muted";
        smallDate.innerHTML = "3 days ago";
        divider.appendChild(header);
        divider.appendChild(smallDate);
        return divider;
    };
    return MessageDTO;
}());
exports.MessageDTO = MessageDTO;
