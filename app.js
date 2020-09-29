"use strict";
function decompose(elem) {
    var text = elem.textContent;
    var textArray = text.split("");
    var textArrayElems = textArray === null || textArray === void 0 ? void 0 : textArray.map(function (char) {
        var elemChar = document.createElement("span");
        elemChar.textContent = char;
        elemChar.className = "test";
        return elemChar;
    });
    elem.innerHTML = "";
    elem.append.apply(elem, textArrayElems);
}
function textFilter(node) {
    if (["p", "span"].includes(node.parentElement.localName)) {
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
console.log(textNodes);
for (var index = 0; index < textNodes.length; index++) {
    var element = textNodes[index];
    console.log(element);
    decompose(element);
}
