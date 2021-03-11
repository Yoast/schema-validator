# Schema Validator - Browser extension

### Developing

### Building 
* `grunt` to build the browser extension.
* `grunt copy` to copy all the static assets: the HTML, CSS and images.
* `grunt webpack` to build the TypeScript.

### Installing for testing purposes
**Note**: The browser extension only works for Chrome at the moment.
1. Go to [chrome://extensions/](chrome://extensions/).
2. Turn the _Developer mode_ toggle in the top-right corner to **on**. Some extra buttons will appear on the page.
3. Click on the _Load unpacked_ button in the top left corner. A file browser will open.
4. Navigate to your local clone of this repository and load the `manifest.json` file.
