# Local Internet Archiver

A cross-browser extension for Chrome and Firefox that saves the raw HTML of
every page you visit. Each snapshot is stored alongside the extension files,
organized by website and date, allowing you to archive your browsing history
without sending data to external servers.

## Features

- **Automatic archiving** – captures the full HTML of every page as it loads.
- **Configurable save folder** – defaults to `Your Archive` inside the extension
  directory but can be changed in the options page.
- **Per-site folders** – files are stored under `<save folder>/<domain>/<YYYY-MM-DD>/`.
- **Popup controls** – toggle archiving or open the options page from the
  extension button.
- **Manifest V2** – uses a non-persistent background script for broad
  browser compatibility.

## Permissions

The extension requests the following permissions:

- **storage** – store user preferences such as the archive folder and enabled state.
- **tabs** – open the options page and interact with the current tab.
- **<all_urls>** – inject the content script on every site you visit to capture pages.

## Platform Notes

Designed for Chrome and Firefox. Other Chromium-based browsers may work but have not been tested.

## Development

No build step is required. The extension runs directly from the source files.
For basic checks you can run:

```bash
npm test
```

This command runs unit tests without requiring network access.

## Loading the Extension

### Chrome
1. Open `chrome://extensions` in your browser.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this repository.

### Firefox
1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on** and choose the `manifest.json` file in this
   repository.

Once loaded, the extension will automatically archive visited pages when
archiving is enabled.

## Manual Testing

1. Load the extension in your browser.
2. Click the extension icon and ensure **Enable archiving** is checked in the
   popup.
3. Visit any webpage and confirm an HTML file appears in the chosen save folder
   inside the extension directory under the appropriate domain and date.
4. Use the **Options** button in the popup to change the save folder and repeat
   the above step to verify files are written to the new location.
