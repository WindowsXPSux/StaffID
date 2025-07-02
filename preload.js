const { contextBridge } = require('electron');

// Expose a limited API to the renderer process using context isolation
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
});
