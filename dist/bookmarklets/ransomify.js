"use strict"; // RANSOMIFY

var hex2Rgb = function hex2Rgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : {
    r: 0,
    g: 0,
    b: 0
  };
};

function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(rgb1, rgb2) {
  var lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  var lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function setFontColors(elemChar) {
  var fontColor = randomColorGen();
  var fontBackgroundColor = randomColorGen();

  while (contrast(hex2Rgb(fontColor), hex2Rgb(fontBackgroundColor)) < 6) {
    fontColor = randomColorGen();
    fontBackgroundColor = randomColorGen();
  }

  elemChar.style.setProperty('color', fontColor);
  elemChar.style.setProperty('background-color', fontBackgroundColor);
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomPixelSizeGen(multiplier, sizeFloor) {
  var randomNum = Math.floor(Math.random() * multiplier);
  return randomNum > sizeFloor ? randomNum.toString() + 'px' : sizeFloor.toString() + 'px';
}

function randomColorGen() {
  var colorArray = ['#ffaf12', '#34558b', '#4ec5a5', '#565d47', '#798fa8', '#fd823e', '#117893', '#f0daa4', '#eaac9d', '#a2553a', '#72617d', '#b49c73', '#3b3d4b', '#eff0f1', '#a09d9c'];
  return getRandomFromArray(colorArray);
}

function randomFontCapitalizationGen() {
  return Math.round(Math.random()) === 1 ? 'uppercase' : 'lowercase';
}

function randomFontGen() {
  var fonts = ['Agency FB', 'Albertina', 'Antiqua', 'Architect', 'Arial', 'BankFuturistic', 'BankGothic', 'Blackletter', 'Blagovest', 'Calibri', 'Comic Sans MS', 'Consolas', 'Courier', 'Cursive', 'Decorative', 'Fantasy', 'Fraktur', 'Frosty', 'Garamond', 'Georgia', 'Helvetica', 'Impact', 'Minion', 'Modern', 'Monospace', 'Open Sans', 'Palatino', 'Perpetua', 'Roman', 'Sans-serif', 'Serif', 'Script', 'Swiss', 'Tahoma', 'Times', 'Times New Roman', 'Tw Cen MT', 'Verdana'];
  return getRandomFromArray(fonts);
}

function randomRotationGen() {
  return "rotate(".concat(Math.random() * 4 - Math.random() * 4, "deg)");
}

function ransomify(spanEl) {
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
} // Demo


wrapCharacters('classnameher').then(function (className) {
  
});