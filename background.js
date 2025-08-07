const browserApi = typeof browser !== 'undefined'
  ? browser
  : (typeof chrome !== 'undefined' ? chrome : null);

function buildPath(folder, urlString, ts) {
  const url = new URL(urlString);
  const d = new Date(ts);
  const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const time = `${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}${String(d.getSeconds()).padStart(2, '0')}`;
  return `${folder}/${url.hostname}/${day}/${time}.html`;
}

async function archivePage(api, data, settings) {
  if (settings.enabled === false) {
    return false;
  }
  const folder = settings.folder || 'Your Archive';
  const path = buildPath(folder, data.url, data.ts ?? Date.now());
  const blobUrl = URL.createObjectURL(new Blob([data.html], { type: 'text/html' }));
  await api.downloads.download({ url: blobUrl, filename: path, saveAs: false });
  URL.revokeObjectURL(blobUrl);
  return path;
}

if (browserApi && browserApi.runtime && browserApi.runtime.onMessage) {
  browserApi.runtime.onMessage.addListener(async (data) => {
    try {
      const settings = await browserApi.storage.local.get({
        enabled: true,
        folder: 'Your Archive'
      });
      await archivePage(browserApi, data, settings);
    } catch (err) {
      console.error('archive error', err);
    }
  });
}

if (typeof module !== 'undefined') {
  module.exports = { buildPath, archivePage };
}
