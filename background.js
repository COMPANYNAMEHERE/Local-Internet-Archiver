const browserApi = typeof browser !== 'undefined'
  ? browser
  : (typeof chrome !== 'undefined' ? chrome : null);
const fs = typeof require !== 'undefined' ? require('fs').promises : null;
const pathMod = typeof require !== 'undefined' ? require('path') : null;

function buildPath(folder, urlString, ts) {
  const url = new URL(urlString);
  const d = new Date(ts);
  const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const time = `${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}${String(d.getSeconds()).padStart(2, '0')}`;
  return `${folder}/${url.hostname}/${day}/${time}.html`;
}

async function archivePage(data, settings) {
  if (settings.enabled === false) {
    return false;
  }
  const folder = settings.folder || 'Your Archive';
  const relPath = buildPath(folder, data.url, data.ts ?? Date.now());
  if (!fs || !pathMod) {
    throw new Error('File system access not available');
  }
  const fullPath = pathMod.join(__dirname, relPath);
  await fs.mkdir(pathMod.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, data.html, 'utf8');
  return fullPath;
}

if (browserApi && browserApi.runtime && browserApi.runtime.onMessage) {
  browserApi.runtime.onMessage.addListener(async (data) => {
    try {
      const settings = await browserApi.storage.local.get({
        enabled: true,
        folder: 'Your Archive'
      });
      await archivePage(data, settings);
    } catch (err) {
      console.error('archive error', err);
    }
  });
}

if (typeof module !== 'undefined') {
  module.exports = { buildPath, archivePage };
}
