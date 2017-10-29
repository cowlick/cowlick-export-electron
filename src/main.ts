"use strict";
import {app, BrowserWindow, Menu} from "electron";
import * as path from "path";
import * as url from "url";
import {createMenu} from "./menu";
import {GameConfig, loadGameConfig} from "./config";

let mainWindow: BrowserWindow;
let menu: Menu;

function createWindow(config: GameConfig) {
  mainWindow = new BrowserWindow({
    width: config.width,
    height: config.height,
    // 64x64
    icon: path.join(__dirname, "icons/icon.png"),
    show: false,
    resizable: false
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true
  }));

  mainWindow.once("closed", function () {
    mainWindow = null;
  });
}

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
