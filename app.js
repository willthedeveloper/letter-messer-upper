"use strict";
//
// 
// 
// Example: ransom note
// 
// 
// 
// Calculating contrast
// From: https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
const hex2Rgb = function (hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : { r: 0, g: 0, b: 0 };
};
function luminance(r, g, b) {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1, rgb2) {
    const lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}
// Set font colors
function setFontColors(elemChar) {
    let fontColor = randomColorGen();
    let fontBackgroundColor = randomColorGen();
    while (contrast(hex2Rgb(fontColor), hex2Rgb(fontBackgroundColor)) < 6) {
        fontColor = randomColorGen();
        fontBackgroundColor = randomColorGen();
    }
    elemChar.style.setProperty('color', fontColor);
    elemChar.style.setProperty('background-color', fontBackgroundColor);
}
// Random generators
function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function randomPixelSizeGen(multiplier, sizeFloor) {
    const randomNum = Math.floor(Math.random() * multiplier);
    return randomNum > sizeFloor
        ? randomNum.toString() + 'px'
        : sizeFloor.toString() + 'px';
}
function randomColorGen() {
    const colorArray = [
        '#ffaf12',
        '#34558b',
        '#4ec5a5',
        '#565d47',
        '#798fa8',
        '#fd823e',
        '#117893',
        '#f0daa4',
        '#eaac9d',
        '#a2553a',
        '#72617d',
        '#b49c73',
        '#3b3d4b',
        '#eff0f1',
        '#a09d9c',
    ];
    return getRandomFromArray(colorArray);
}
function randomFontCapitalizationGen() {
    return Math.round(Math.random()) === 1 ? 'uppercase' : 'lowercase';
}
function randomFontGen() {
    const fonts = [
        'Agency FB',
        'Albertina',
        'Antiqua',
        'Architect',
        'Arial',
        'BankFuturistic',
        'BankGothic',
        'Blackletter',
        'Blagovest',
        'Calibri',
        'Comic Sans MS',
        'Consolas',
        'Courier',
        'Cursive',
        'Decorative',
        'Fantasy',
        'Fraktur',
        'Frosty',
        'Garamond',
        'Georgia',
        'Helvetica',
        'Impact',
        'Minion',
        'Modern',
        'Monospace',
        'Open Sans',
        'Palatino',
        'Perpetua',
        'Roman',
        'Sans-serif',
        'Serif',
        'Script',
        'Swiss',
        'Tahoma',
        'Times',
        'Times New Roman',
        'Tw Cen MT',
        'Verdana',
    ];
    return getRandomFromArray(fonts);
}
function randomRotationGen() {
    return `rotate(${(Math.random() * 4) - (Math.random() * 4)}deg)`;
}
function ransomify(spanEl) {
    spanEl.setAttribute('class', 'letter');
    setFontColors(spanEl);
    spanEl.style.setProperty('font-family', randomFontGen());
    spanEl.style.setProperty('text-transform', randomFontCapitalizationGen());
    spanEl.style.setProperty('top', randomPixelSizeGen(3, 1));
    spanEl.style.setProperty('left', randomPixelSizeGen(3, 1));
    spanEl.style.setProperty('right', randomPixelSizeGen(3, 1));
    spanEl.style.setProperty('bottom', randomPixelSizeGen(3, 1));
    spanEl.style.setProperty('font-size', randomPixelSizeGen(20, 15));
    spanEl.style.setProperty('transform', randomRotationGen());
    spanEl.style.setProperty('display', 'inline-block');
    spanEl.style.setProperty('padding', '0 1px;');
    spanEl.style.setProperty('box-shadow', '0px 1px 0px 0px #0000003');
}
//
// 
// 
// Example: slowly lose it
// 
// 
// 
function getRandomDistance() {
    const factor = 4;
    let num = Math.random() * factor;
    num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    return num;
}
function moveRandomly(el) {
    const directions = ['top', 'left'];
    for (let prop of directions) {
        const pos = el.style[prop];
        const pos_ = parseInt(pos.substr(0, pos.length - 2)) + getRandomDistance();
        el.style.setProperty(prop, `${pos_}px`);
    }
}
function makeRandomMoves() {
    const els = document.getElementsByClassName('slowly-lose-it');
    window.setInterval(function () {
        const el = els[Math.floor(Math.random() * els.length)];
        moveRandomly(el);
    }, 5);
}
function slowlyLoseIt(spanEl) {
    spanEl.setAttribute('class', 'slowly-lose-it');
    spanEl.style.setProperty('position', 'relative');
    spanEl.style.setProperty('top', '0px');
    spanEl.style.setProperty('left', '0px');
}
//
// 
// 
// Decompose page and wrap individual letters
// 
// 
// 
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
function doThisToEveryLetter(transformFunc, cb) {
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
                transformFunc(elemChar);
            }
            textNode.parentNode?.insertBefore(elemChar, textNode);
            return elemChar;
        });
        textNode.parentNode?.removeChild(textNode);
    }
    cb();
}
;
//
// 
// 
// Example: spring back
// 
// 
// 
function springBackWrap(spanEl) {
    spanEl.setAttribute('class', 'springy');
    spanEl.setAttribute('draggable', 'true');
    let draggedTop, draggedLeft;
    spanEl.addEventListener('dragstart', function (e) {
        console.log(e);
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 50;
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = 4;
        ctx.moveTo(0, 0);
        ctx.lineTo(50, 50);
        ctx.moveTo(0, 50);
        ctx.lineTo(50, 0);
        ctx.stroke();
        e.dataTransfer.setDragImage(canvas, 0, 0);
        draggedTop = e.target.offsetTop;
        draggedLeft = e.target.offsetLeft;
        spanEl.style.setProperty('position', 'relative');
    });
    spanEl.addEventListener('drag', function (e) {
        console.log(e);
        spanEl.style.setProperty('top', `${e.offsetY - draggedTop}px`);
        spanEl.style.setProperty('left', `${e.offsetX - draggedLeft}px`);
    });
}
function springBack() {
    const letters = document.getElementsByClassName('springy');
    // console.log(letters);
}
//
// 
// 
// Initializers
// 
// 
// 
// doThisToEveryLetter(ransomify);
doThisToEveryLetter(slowlyLoseIt, makeRandomMoves);
// doThisToEveryLetter(springBackWrap, springBack);
m