(function () {
  const browserApi = typeof browser !== 'undefined' ? browser : chrome;
  const checkbox = document.getElementById('enabled');
  const optionsBtn = document.getElementById('options');

  browserApi.storage.local.get({ enabled: true }).then((res) => {
    console.log('popup loaded with enabled', res.enabled);
    checkbox.checked = res.enabled !== false;
  });

  checkbox.addEventListener('change', () => {
    console.log('popup toggled enabled to', checkbox.checked);
    browserApi.storage.local.set({ enabled: checkbox.checked });
  });

  optionsBtn.addEventListener('click', () => {
    console.log('opening options page');
    if (browserApi.runtime.openOptionsPage) {
      browserApi.runtime.openOptionsPage();
    } else {
      browserApi.tabs.create({ url: browserApi.runtime.getURL('options.html') });
    }
  });
})();
