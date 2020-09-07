"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImage = exports.validURL = void 0;
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(str);
}
exports.validURL = validURL;
function checkImage(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
exports.checkImage = checkImage;
