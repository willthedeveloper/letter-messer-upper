function textFilter(node: Node) {
    if (
        [
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
        ].includes(node.parentElement!.localName)
    ) {
        return NodeFilter.FILTER_ACCEPT;
    } else {
        return NodeFilter.FILTER_SKIP;
    }
}

function getTextNodes(): Node[] {
    var walk = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        { acceptNode: textFilter },
        true
    );
    var n,
        a = [];

    while ((n = walk.nextNode())) a.push(n);
    return a;
}

export const doThisToEveryLetter = function (transformFunc: Function) {
    // Get all text nodes in DOM
    let textNodes = getTextNodes();

    for (let textNode of textNodes) {
        // Split node up into individual letters
        let text = textNode.textContent;
        let textArray = text?.split('');

        // Generate the new element for each letter.
        textArray?.map((char: string) => {
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
};
