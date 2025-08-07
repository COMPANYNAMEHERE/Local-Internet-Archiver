(function () {
  const browserApi = typeof browser !== 'undefined' ? browser : chrome;
  const checkbox = document.getElementById('enabled');

  browserApi.storage.local.get('enabled').then((res) => {
    checkbox.checked = res.enabled !== false;
  });

  checkbox.addEventListener('change', () => {
    browserApi.storage.local.set({ enabled: checkbox.checked });
  });
})();
