"use strict";
/**
 *
 *
 * Modify the buildYourOwnEdits() function to apply custom behavior to every letter on the page.
 * Test the function, and once it works locally, copy this entire file into a bookmarklet generator like https://medialab.github.io/artoo/generator/
 * Finally, test your bookmarklet out on any site!
 *
 */
// UTILS
function textFilter(node) {
    if ([
        'p',
        'span',
        'label',
        'a',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'td',
        'li',
        'section',
        'div',
        'input',
        'button',
        'label',
        'b',
        'strong',
        'em',
        'pre',
        'footer',
        'cite',
        'time',
        'abbr',
        'del',
        'sub',
        'dd',
        'dt',
        'legend',
        'q',
        'mark',
        'samp',
        'ins',
        'var',
        'i',
        'dfn',
        'code'
    ].includes(node.parentElement.localName)) {
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
function shouldWrap(className) {
    return document.getElementsByClassName(className).length === 0;
}
function wrapCharacters(className) {
    return new Promise((resolve, reject) => {
        // Get all text nodes in DOM
        let textNodes = getTextNodes();
        for (let textNode of textNodes) {
            // Split node up into individual letters
            let text = textNode.textContent;
            let textArray = text?.split('');
            // Generate the new element for each letter.
            textArray?.map((char) => {
                const elemChar = document.createElement('span');
                const isEmptySpace = char === ' ' || char === '\n';
                elemChar.textContent = char;
                if (!isEmptySpace) {
                    elemChar.setAttribute('class', className);
                }
                textNode.parentNode?.insertBefore(elemChar, textNode);
                return elemChar;
            });
            textNode.parentNode?.removeChild(textNode);
        }
        resolve(className);
    });
}
function deployWrapperFunction(className, wrapperFunc) {
    const elems = document.getElementsByClassName(className);
    for (let index = 0; index < elems.length; index++) {
        const element = elems[index];
        wrapperFunc(element);
    }
}
function buildYourOwnEdits(spanEl) {
    // Make edits to the properties of an individual HTMLSpanElement
    // EX:
    // spanEl.style.setProperty('color', 'red');
    // spanEl.style.setProperty('display', 'inline-block');
    // spanEl.style.setProperty('padding', '0 1px;');
    // spanEl.style.setProperty('box-shadow', '1px 1px 1px 0px #0000003');
}
async function buildYourOwn() {
    if (shouldWrap('all-chars')) {
        await wrapCharacters('all-chars');
        deployWrapperFunction('all-chars', buildYourOwnEdits);
    }
    else {
        deployWrapperFunction('all-chars', buildYourOwnEdits);
    }
}
