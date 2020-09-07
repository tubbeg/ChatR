"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessage = exports.MessageType = exports.MessageDTO = void 0;
var MessageDTO = (function () {
    function MessageDTO(message) {
        this.Author = message.Author;
        this.Content = message.Content;
        this.Type = message.Type;
    }
    return MessageDTO;
}());
exports.MessageDTO = MessageDTO;
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
