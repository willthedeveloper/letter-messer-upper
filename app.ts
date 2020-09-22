let elem = document.getElementById("select-me");
let text = elem?.textContent;
let textArray = text?.split("");

let textArrayElems = textArray?.map((char) => {
  const elemChar = document.createElement("span");
  elemChar.textContent = char;
  elemChar.className = "test";
  //elem!.appendChild(elemChar);
  return elemChar;
});

elem!.innerHTML = ""
elem!.append(...textArrayElems!);



//elem!.innerText = "";
//console.log(textArrayElems);
