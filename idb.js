// idb.js – a  tiny wrapper around IndexedDB  (CC-0)
// API: openDB(name, version, { upgrade(db) { … } }).then(db => db.put(store, value))

export function openDB(name, version, { upgrade } = {}) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name, version);
    req.onerror   = () => reject(req.error);
    req.onsuccess = () => resolve(wrapDB(req.result));
    req.onupgradeneeded = () => upgrade && upgrade(req.result);
  });
}

function wrapDB(db) {
  return {
    put(store, value, key) {
      return tx(db, store, 'readwrite').then(s => promisify(s.put(value, key)));
    },
    get(store, key) {
      return tx(db, store).then(s => promisify(s.get(key)));
    },
    getAll(store) {
      return tx(db, store).then(s => promisify(s.getAll()));
    }
  };
}

function tx(db, store, mode = 'readonly') {
  return new Promise((res, rej) => {
    const t = db.transaction(store, mode);
    t.onerror = () => rej(t.error);
    res(t.objectStore(store));
  });
}

function promisify(req) {
  return new Promise((res, rej) => {
    req.onsuccess = () => res(req.result);
    req.onerror   = () => rej(req.error);
  });
}
