const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendWindowControl: (action) => ipcRenderer.send('window-control', action)
});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}--version`, process.versions[type])
    }
})