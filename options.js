(function () {
  const browserApi = typeof browser !== 'undefined' ? browser : chrome;
  const checkbox = document.getElementById('enabled');
  const folderInput = document.getElementById('folder');

  browserApi.storage.local.get({ enabled: true, folder: 'Your Archive' }).then((res) => {
    console.log('loaded settings', res);
    checkbox.checked = res.enabled !== false;
    folderInput.value = res.folder || 'Your Archive';
  });

  checkbox.addEventListener('change', () => {
    console.log('toggled enabled to', checkbox.checked);
    browserApi.storage.local.set({ enabled: checkbox.checked });
  });

  folderInput.addEventListener('change', () => {
    const name = folderInput.value.trim() || 'Your Archive';
    folderInput.value = name;
    console.log('updated folder to', name);
    browserApi.storage.local.set({ folder: name });
  });
})();
