# linked-data-visualizer

Provides graph visualization of data structure of records from the Getty collection.

## Requirements

- Firefox v109 or higher, Chrome v88 or higher (browser must support Manifest v3)
- Node v22+

## Installation

1. Clone git repo to your local machine
2. Run `npm install` from inside directory
3. Temporarily load in browser
   1. For Firefox: follow instructions at [https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)
   2. For Chrome: follow instructions at [https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)

## Usage

1. Navigate to a page in the Getty's online collection; it should start with "https://www.getty.edu/art/collection/" (e.g., [https://www.getty.edu/art/collection/person/103JT2](https://www.getty.edu/art/collection/person/103JT2)).
2. Open the extension from your browser's toolbar
3. Clicking on nodes reveals data attached to a node. Graph view can be zoomed with the mouse wheel or touchpad. Nodes can be dragged to readjust view.

## Notes

Initial local testing and development done in the [capezzuto/linked-data-graph-prototype](https://github.com/Capezzuto/linked-data-graph-prototype) repository, then brought over to this repository for integration with the browser extension infrastructure.
