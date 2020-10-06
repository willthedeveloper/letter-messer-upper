"use strict";
function randomColorGen() {
    const colorArray = ["red", "blue", "yellow", "orange"];
    const colorSelection = colorArray[Math.floor(Math.random() * colorArray.length)];
    return colorSelection;
}
function setFontColors(elemChar) {
    let fontColor = randomColorGen();
    let fontBackgroundColor = randomColorGen();
    while (fontColor === fontBackgroundColor) {
        fontColor = randomColorGen();
        fontBackgroundColor = randomColorGen();
    }
    elemChar.style.setProperty("color", fontColor);
    elemChar.style.setProperty("background-color", fontBackgroundColor);
    if (elemChar.textContent === " ") {
        elemChar.style.setProperty("background-color", "");
    }
}
function randomPixelSizeGen(multiplier, sizeFloor) {
    const randomNum = Math.floor(Math.random() * multiplier);
    return randomNum > sizeFloor
        ? randomNum.toString() + "px"
        : sizeFloor.toString() + "px";
}
function randomFontCapitalizationGen() {
    return Math.round(Math.random()) === 1 ? "uppercase" : "lowercase";
}
function randomFontGen() {
    const fontFamilys = [];
}
function decompose(elem) {
    let text = elem.textContent;
    let textArray = text?.split("");
    let textArrayElems = textArray?.map((char) => {
        const elemChar = document.createElement("span");
        elemChar.textContent = char;
        //elemChar.className = "test";
        setFontColors(elemChar);
        elemChar.style.setProperty("text-transform", randomFontCapitalizationGen());
        elemChar.style.setProperty("top", randomPixelSizeGen(3, 1));
        elemChar.style.setProperty("left", randomPixelSizeGen(3, 1));
        elemChar.style.setProperty("right", randomPixelSizeGen(3, 1));
        elemChar.style.setProperty("bottom", randomPixelSizeGen(3, 1));
        elemChar.style.setProperty("font-size", randomPixelSizeGen(40, 20));
        // elemChar.className = Math.round(Math.random()) === 1 ? "test" : "test_alt";
        elem.parentNode?.insertBefore(elemChar, elem);
        return elemChar;
    });
    elem.parentNode?.removeChild(elem);
}
function textFilter(node) {
    if (["p", "span", "label", "a", "h*"].includes(node.parentElement.localName)) {
        return NodeFilter.FILTER_ACCEPT;
    }
    else {
        return NodeFilter.FILTER_SKIP;
    }
}
function getTextNodes() {
    var walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: textFilter }, true);
    var n, a = [];
    while ((n = walk.nextNode()))
        a.push(n);
    return a;
}
let textNodes = getTextNodes();
for (let index = 0; index < textNodes.length; index++) {
    const textNode = textNodes[index];
    decompose(textNode);
}
