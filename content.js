(function () {
  const payload = {
    url: location.href,
    title: document.title,
    html: document.documentElement.outerHTML,
    ts: Date.now()
  };
  chrome.runtime.sendMessage(payload);
})();
