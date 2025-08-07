# Local Internet Archiver

A cross-browser extension for Chrome and Firefox that saves the raw HTML of
every page you visit. Each snapshot is stored in your Downloads folder,
organized by website and date, allowing you to archive your browsing history
without sending data to external servers.

## Features

- **Automatic archiving** – captures the full HTML of every page as it loads.
- **Per-site folders** – files are stored under `~/Downloads/<domain>/<YYYY-MM-DD>/`.
- **Options page** – toggle archiving on or off from the extension's options.
- **Manifest V2** – uses a non-persistent background script for broad
  browser compatibility.

## Development

No build step is required. The extension runs directly from the source files.
For basic checks you can run:

```bash
npm test
```

This command currently prints a placeholder message so it works even without
network access.

## Loading the Extension

### Chrome
1. Open `chrome://extensions` in your browser.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this repository.

### Firefox
1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on** and choose the `manifest.json` file in this
   repository.

Once loaded, the extension will automatically archive visited pages.
Clicking the extension icon opens an options page where archiving can be
enabled or disabled.

## Manual Testing

1. Load the extension in your browser.
2. Ensure the **Enable archiving** box is checked on the options page.
3. Visit any webpage and confirm an HTML file appears in your Downloads folder
   under the appropriate domain and date.
