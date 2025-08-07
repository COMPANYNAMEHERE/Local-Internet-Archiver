# Local Internet Archiver

A cross-browser extension for Chrome and Firefox that saves the raw HTML of every page you visit. Each snapshot is stored in your Downloads folder, organized by website and date, allowing you to archive your browsing history without sending data to external servers.

## Development

1. Install dependencies (requires access to npm):
   ```bash
   npm install
   ```
2. Run extension linting:
   ```bash
   npm test
   ```
   This uses [web-ext](https://github.com/mozilla/web-ext) to verify the structure of the extension.

## Loading the Extension

### Chrome
1. Open `chrome://extensions` in your browser.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this repository.

### Firefox
1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on** and choose the `manifest.json` file in this repository.

Once loaded, the extension will automatically archive visited pages.

Clicking the extension icon opens an options page where archiving can be enabled or disabled. Archived pages are stored under `~/Downloads/<domain>/<YYYY-MM-DD>/` with filenames based on the time of capture.
