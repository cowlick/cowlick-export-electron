"use strict";
import {app, BrowserWindow, Menu} from "electron";
import * as path from "path";
import * as url from "url";
import {createMenu} from "./menu";
import {GameConfig, loadGameConfig} from "./config";

let mainWindow: BrowserWindow;
let menu: Menu;

const urlPattern = new RegExp("^https?:$");

function createWindow(config: GameConfig) {
  mainWindow = new BrowserWindow({
    width: config.width,
    height: config.height,
    // 64x64
    icon: path.join(__dirname, "icons/icon.png"),
    show: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js")
    }
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true
  }));

  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.once("devtools-opened", () => setImmediate(() => mainWindow.focus()));
    mainWindow.webContents.openDevTools({mode: "detach"});
  }

  mainWindow.once("closed", function () {
    mainWindow = null;
  });
}

app.on("browser-window-created", function (event, window) {
  window.webContents.on("new-window", function(event, targetUrl, frameName, disposition, options) {
    const protocol = url.parse(targetUrl).protocol;
    if(! urlPattern.test(protocol)) {
      event.preventDefault();
      throw new Error("invalid url:" + url);
    }
  });
});

const loading = loadGameConfig();
app.once("ready", () => {
  loading.then(config => {
    createWindow(config);
    menu = createMenu();
  })
    .catch(e => {
      console.error("Unknown error: ", e);
      app.quit();
    });
});

app.once("window-all-closed", () => {
  app.quit();
});
