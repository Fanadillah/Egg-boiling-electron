const { app, BrowserWindow, ipcMain } = require('electron');
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});
const path = require('node:path');

function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 350,
    resizable: false,
    transparent: true, // window transparan
    frame: false, // window tanpa frame bawaan
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

// Listener IPC untuk custom window controls
ipcMain.on('window-control', (event, action) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (action === 'minimize') {
    win.minimize();
  } else if (action === 'maximize') {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  } else if (action === 'close') {
    win.close();
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
