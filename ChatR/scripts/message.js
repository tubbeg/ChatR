"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
