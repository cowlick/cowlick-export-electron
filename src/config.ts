"use strict";
import * as path from "path";
import * as fs from "fs";

export interface GameConfig {
  width: number;
  height: number;
}

let config: GameConfig | null = null;

export function loadGameConfig(): Promise<GameConfig> {
  return new Promise<GameConfig>((resolve, reject) => {
    const file = path.join(__dirname, "game.json");
    try {
      config = JSON.parse(fs.readFileSync(file, {encoding: "utf8"})) as GameConfig;
    } catch (e) {
      reject(e);
    }
    resolve(config);
  });
}