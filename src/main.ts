"use strict";
import {app, BrowserWindow, Menu} from "electron";
import * as path from "path";
import * as url from "url";
import {createMenu} from "./menu";

let mainWindow: BrowserWindow;
let menu: Menu;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
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

app.once("ready", () => {
  createWindow();
  menu = createMenu();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});