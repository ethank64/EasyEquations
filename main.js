const { app, BrowserWindow, ipcMain } = require('electron');
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

// Listen for LaTeX input from the renderer process
ipcMain.on('convert-latex', (event, latexCode) => {
    const tempTexPath = path.join(app.getPath('temp'), 'document.tex');
    const outputDocxPath = path.join(app.getPath('desktop'), 'ConvertedDocument.docx');

    // Save LaTeX code to a .tex file
    writeFile(tempTexPath, latexCode, (err) => {
        if (err) {
            event.reply('conversion-status', 'Error writing LaTeX file.');
            return;
        }

        // Convert to Word using Pandoc
        exec(`pandoc "${tempTexPath}" -o "${outputDocxPath}"`, (error, stdout, stderr) => {
            if (error) {
                event.reply('conversion-status', `Error: ${stderr}`);
                console.error(`Error: ${stderr}`);
            } else {
                console.log(`File saved at: ${outputDocxPath}`);
                event.reply('conversion-status', `Conversion successful! File saved at: ${outputDocxPath}`);
                unlink(tempTexPath, () => {}); // Delete temporary file
            }
        });
    });
});
