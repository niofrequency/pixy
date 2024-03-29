const { app, BrowserWindow, ipcMain } = require('electron');
const wallpaper = require('wallpaper');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

ipcMain.on('set-wallpaper', async (event, filePath) => {
    try {
        await wallpaper.set(filePath);
        console.log('Wallpaper set successfully.');
    } catch (error) {
        console.error('Error setting wallpaper:', error.message);
    }
});
