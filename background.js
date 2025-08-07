importScripts('idb.js');   // tiny helper – or replace with vanilla IDB

const dbPromise = idb.openDB('archives', 1, {
  upgrade(db) {
    const store = db.createObjectStore('pages', { keyPath: 'url' });
    store.createIndex('ts', 'ts');
  }
});

chrome.runtime.onMessage.addListener(async data => {
  try {
    const db = await dbPromise;
    await db.put('pages', data);       // overwrites if same URL visited twice
    console.log('[saved]', data.url);
  } catch (e) {
    console.error('DB error', e);
  }
});
