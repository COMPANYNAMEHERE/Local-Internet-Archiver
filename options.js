(function () {
  const browserApi = typeof browser !== 'undefined' ? browser : chrome;
  const checkbox = document.getElementById('enabled');
  const folderInput = document.getElementById('folder');

  browserApi.storage.local.get({ enabled: true, folder: 'Your Archive' }).then((res) => {
    checkbox.checked = res.enabled !== false;
    folderInput.value = res.folder || 'Your Archive';
  });

  checkbox.addEventListener('change', () => {
    browserApi.storage.local.set({ enabled: checkbox.checked });
  });

  folderInput.addEventListener('change', () => {
    const name = folderInput.value.trim() || 'Your Archive';
    folderInput.value = name;
    browserApi.storage.local.set({ folder: name });
  });
})();
