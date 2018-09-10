const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const createWindow = (config) => {
  const { height, template, width } = config;
  
  // Create the browser window.
  let win = new BrowserWindow({ height, width });

  // and load the index.html of the app.
  // win.loadFile(template);

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, template),
    protocol: 'file:',
    slashes: true
  });
  win.loadURL(startUrl);

  // Open the DevTools.
  win.webContents.openDevTools();
  
  return win;
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
const initMainWin = () => {
  win = createWindow({
    height: 600,
    width: 600,
    template: 'index.html'
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
};

let logEntry;
const initLogEntryWin = () => {
  // only ever show one entry window
  if (logEntry) { return; }

  logEntry = createWindow({
    height: 200,
    width: 400,
    template: 'log-entry.html'
  });
  
  // Emitted when the window is closed.
  logEntry.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    logEntry = null;
  });
};

const onReady = () => {
  initMainWin();
  // TODO make configurable
  setInterval(initLogEntryWin, 10000);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onReady);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    initMainWin();
  }
});

ipcMain.on('log:entry:new', (evt) => {
  win && win.webContents.send('log:entry:new');
  logEntry && logEntry.destroy();
});