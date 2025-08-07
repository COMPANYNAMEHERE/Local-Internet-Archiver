(function () {
  const browserApi = typeof browser !== 'undefined' ? browser : chrome;

  const payload = {
    url: location.href,
    title: document.title,
    html: document.documentElement.outerHTML,
    ts: Date.now()
  };

  // Send the page snapshot to the background script for storage on disk.
  console.log('sending archive payload', payload);
  browserApi.runtime.sendMessage(payload)
    .then(() => {
      console.log('archive payload sent');
    })
    .catch((err) => {
      console.error('sendMessage failed', err);
    });
})();
