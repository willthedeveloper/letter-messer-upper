function decompose(elem) {
  let text = elem.textContent;
  let textArray = text.split("");

  let textArrayElems = textArray?.map((char) => {
    const elemChar = document.createElement("span");
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
  var n,
    a = [];

  while ((n = walk.nextNode())) a.push(n);
  return a;
}

let textNodes = getTextNodes();

for (let index = 0; index < textNodes.length; index++) {
  const textNode = textNodes[index];
  decompose(textNode);
}
