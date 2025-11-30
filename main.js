const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'icon.png'), // 如果有图标的话
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false // 允许加载本地资源(解决 file:// 协议下的 CORS 问题)
        }
    });

    win.loadFile('index.html');

    // 开发环境打开调试工具
    // win.webContents.openDevTools();
}

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

