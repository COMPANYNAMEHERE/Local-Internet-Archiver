(function () {
  const browserApi = typeof browser !== 'undefined' ? browser : chrome;
  const checkbox = document.getElementById('enabled');
  const optionsBtn = document.getElementById('options');

  browserApi.storage.local.get({ enabled: true }).then((res) => {
    checkbox.checked = res.enabled !== false;
  });

  checkbox.addEventListener('change', () => {
    browserApi.storage.local.set({ enabled: checkbox.checked });
  });

  optionsBtn.addEventListener('click', () => {
    if (browserApi.runtime.openOptionsPage) {
      browserApi.runtime.openOptionsPage();
    } else {
      browserApi.tabs.create({ url: browserApi.runtime.getURL('options.html') });
    }
  });
})();
