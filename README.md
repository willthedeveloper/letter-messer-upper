# letter-messer-upper

Create bookmarklets that control every letter on any webpage.

[Demo site](https://letter-messer-upper.surge.sh)

### Development

-   Install dependencies: `npm install`
-   Run local development server: `npm start`

### Creating your own letter-messer-upper

You can experiment with your own letter-messer-upper, and explore the HTML parsing logic that makes the LMU possible, in the "buildYourOwn.js" file.

At a high-level, the letter-messer-upper:

-   Identifies all the text content on a page
-   "Wraps" each individual character in an HTML '<span>' element
-   Applies JS / CSS logic to each of these elements

We've taken care of the first two steps, while the third is where your creativity comes into play!

Take note of the "buildYourOwnEdits" function defined at line 110 of the "buildYourOwn.js" file. Here, you'll see some commented out code, where each line applies a CSS property to your the individual text character span elements. By making edits to this function, you'll have created your own custom letter-messer-upper. Then, you can run it on the demo site by clicking the button outlined near the top of the page.

For more advanced examples, you can take a look at the ransomify, move-a-little, and solar-flare examples in the codebase.
