const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendLatexToConvert: (latex) => ipcRenderer.send('convert-latex', latex),
    onConversionStatus: (callback) => ipcRenderer.on('conversion-status', (event, status) => callback(status))
});
