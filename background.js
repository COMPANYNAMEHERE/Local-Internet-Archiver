importScripts('idb.js');

// Prefer the `browser` namespace when available, otherwise fall back to `chrome`.
const browserApi = typeof browser !== 'undefined' ? browser : chrome;

// Open an IndexedDB database to store archived pages.
const dbPromise = idb.openDB('archives', 1, {
  upgrade(db) {
    const store = db.createObjectStore('pages', { keyPath: 'url' });
    store.createIndex('ts', 'ts');
  }
});

// Listen for messages from the content script containing page data.
browserApi.runtime.onMessage.addListener(async (data) => {
  try {
    const db = await dbPromise;
    // Overwrite existing entry if the same URL is visited again.
    await db.put('pages', data);
    console.log('[saved]', data.url);
  } catch (err) {
    console.error('DB error', err);
  }
});
