const { ipcMain, app, Menu, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

const startUrl =
  process.env.ELECTRON_START_URL ||
  url.format({
    pathname: path.join(__dirname, "/../build/index.html/#/"),
    protocol: "file:",
    slashes: true,
  });

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 600,
    transparent: false,
    // resizable: false,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // Menu.setApplicationMenu(null);
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle("create-note", async (event, args) => {
  const win = new BrowserWindow({
    width: 350,
    height: 600,
    transparent: false,
    // resizable: false,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  win.loadURL(startUrl + "note");
});
