const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { writeFile, unlink } = require('fs');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
});

// Open "Save As" dialog
ipcMain.handle('open-save-dialog', async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Save Converted Document',
    defaultPath: path.join(app.getPath('desktop'), 'ConvertedDocument.docx'),
    filters: [{ name: 'Word Document', extensions: ['docx'] }]
  });

  return canceled ? null : filePath;
});

// Use the bundled Pandoc version
const pandocPath = path.join(process.resourcesPath, 'pandoc', 'pandoc.exe');
console.log(`Using Pandoc from: ${pandocPath}`);

// Handle LaTeX conversion
ipcMain.on('convert-latex', (event, { latexCode, savePath }) => {
  if (!latexCode) {
    event.reply('conversion-status', 'Error: No LaTeX code provided.');
    return;
  }
  if (!savePath) {
    event.reply('conversion-status', 'Error: No save path provided.');
    return;
  }

  const tempTexPath = path.join(app.getPath('temp'), 'document.tex');

  // Write LaTeX to a temporary file
  writeFile(tempTexPath, latexCode, (err) => {
    if (err) {
      event.reply('conversion-status', `Error writing LaTeX file: ${err}`);
      return;
    }

    // Convert to Word using the bundled Pandoc
    exec(`"${pandocPath}" "${tempTexPath}" -o "${savePath}"`, (error, stdout, stderr) => {
      if (error) {
        event.reply('conversion-status', `Error: ${stderr}`);
        console.error(`Error: ${stderr}`);
      } else {
        console.log(`File saved at: ${savePath}`);
        event.reply('conversion-status', `Conversion successful! File saved at: ${savePath}`);
        unlink(tempTexPath, () => {}); // Delete temporary file
      }
    });
  });
});
