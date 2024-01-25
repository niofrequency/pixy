const { ipcRenderer } = require('electron');

function setGIFAsWallpaper() {
    ipcRenderer.send('set-wallpaper', document.getElementById('gifFile').files[0].path);
}
