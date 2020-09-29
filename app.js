"use strict";
function decompose(elem) {
    var text = elem.textContent;
    var textArray = text.split("");
    var textArrayElems = textArray === null || textArray === void 0 ? void 0 : textArray.map(function (char) {
        var elemChar = document.createElement("span");
        elemChar.textContent = char;
        elemChar.className = "test";
        elem.parentNode.insertBefore(elemChar, elem);
        return elemChar;
    });
    elem.parentNode.removeChild(elem);
}
function textFilter(node) {
    if (["p", "span", "label", "a", "h*"].includes(node.parentElement.localName)) {
        return NodeFilter.FILTER_ACCEPT;
    }
}
function getTextNodes() {
    var walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: textFilter }, true);
    var n, a = [];
    while ((n = walk.nextNode()))
        a.push(n);
    return a;
}
var textNodes = getTextNodes();
for (var index = 0; index < textNodes.length; index++) {
    var textNode = textNodes[index];
    decompose(textNode);
}
