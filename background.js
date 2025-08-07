const browserApi = typeof browser !== 'undefined' ? browser : chrome;

browserApi.runtime.onMessage.addListener(async (data) => {
  try {
    const { enabled } = await browserApi.storage.local.get('enabled');
    if (enabled === false) {
      return;
    }

    const url = new URL(data.url);
    const d = new Date();
    const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const time = `${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}${String(d.getSeconds()).padStart(2, '0')}`;
    const path = `${url.hostname}/${day}/${time}.html`;

    const blobUrl = URL.createObjectURL(new Blob([data.html], { type: 'text/html' }));
    await browserApi.downloads.download({ url: blobUrl, filename: path, saveAs: false });
    URL.revokeObjectURL(blobUrl);
    console.log('[saved]', path);
  } catch (err) {
    console.error('archive error', err);
  }
});

if (browserApi.action && browserApi.action.onClicked) {
  browserApi.action.onClicked.addListener(() => {
    if (browserApi.runtime.openOptionsPage) {
      browserApi.runtime.openOptionsPage();
    }
  });
}
