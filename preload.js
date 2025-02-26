const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Open the "Save As" dialog
  openSaveDialog: () => ipcRenderer.invoke('open-save-dialog'),

  // Send LaTeX + chosen path to main process
  sendLatexToConvert: (data) => ipcRenderer.send('convert-latex', data),

  // Listen for conversion status
  onConversionStatus: (callback) => ipcRenderer.on('conversion-status', (event, status) => callback(status))
});
