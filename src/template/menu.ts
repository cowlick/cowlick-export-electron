"use strict";
import {Menu, MenuItemConstructorOptions} from "electron";

const templates: MenuItemConstructorOptions[] = [
  {
    label: "File",
    submenu: [
      {
        role: "quit"
      }
    ]
  }
];

export function createMenu(): Menu {
  const menu = Menu.buildFromTemplate(templates);
  Menu.setApplicationMenu(menu);
  return menu;
}