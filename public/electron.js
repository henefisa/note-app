const { ipcMain, app, Menu, BrowserWindow } = require("electron");
const db = require("./db");
const path = require("path");
const url = require("url");

db.initializeDatabase();

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

ipcMain.handle("new-note", async (event, args) => {
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

  const data = await db.insertNote("");
  win.loadURL(startUrl + `note/${data.$id}`);
  return data;
});

ipcMain.handle("update-note", async (event, args) => {
  const updated = await db.updateNote({ id: args.$id, content: args.$content });
  return updated;
});

ipcMain.handle("delete-note", async (event, args) => {
  db.deleteNote(args.id);
});

ipcMain.handle("get-note", async (event, args) => {
  const note = await db.getNote(args.$id);
  return note;
});

ipcMain.handle("get-all-notes", async (event, args) => {
  const notes = await db.getAllNotes();
  return notes;
});

ipcMain.handle("close-window", async (event, args) => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    window.close();
  }
});

ipcMain.handle("open-note", async (event, args) => {
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

  win.loadURL(startUrl + `note/${args.id}`);
});
