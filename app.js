"use strict";
var _a;
var elem = document.getElementById("select-me");
var text = elem === null || elem === void 0 ? void 0 : elem.textContent;
var textArray = text === null || text === void 0 ? void 0 : text.split("");
var textArrayElems = textArray === null || textArray === void 0 ? void 0 : textArray.map(function (char) {
    var elemChar = document.createElement("span");
    elemChar.textContent = char;
    elemChar.className = "test";
    //elem!.appendChild(elemChar);
    return elemChar;
});
elem.innerHTML = "";
(_a = elem).append.apply(_a, textArrayElems);
//elem!.innerText = "";
//console.log(textArrayElems);
