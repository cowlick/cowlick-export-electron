"use strict";
import * as fs from "fs";
import * as path from "path";
import * as commandpost from "commandpost";
import {replaceIndex} from "./Html";

function readPackageJson(baseDir: string) {
  return JSON.parse(fs.readFileSync(path.resolve(baseDir, "package.json"), "utf8"))
}

const packageJson = readPackageJson(path.resolve(__dirname, ".."));

interface RootArgs {
  target: string;
}

const root = commandpost
  .create<{}, RootArgs>("cowlick export electron [target]")
  .version(packageJson.version, "-v, --version")
  .action((opts, args) => {
    const baseDir = path.resolve(process.cwd(), args.target);
    const targetPackageJson = readPackageJson(baseDir);
    replaceIndex(baseDir, targetPackageJson);
  });

commandpost
  .exec(root, process.argv)
  .then(() => {
    process.stdout.write("");
    process.exit(0);
  }, err => {
    console.error("uncaught error", err);
    if (err.stack) {
      console.error(err.stack);
    }
    process.stdout.write("");
    process.exit(1);
  });