"use strict";
import * as fs from "fs";
import * as path from "path";
import * as commandpost from "commandpost";
import {replaceIndex} from "./Html";
import {copyTemplate} from "./Template";

function readPackageJson(baseDir: string) {
  return JSON.parse(fs.readFileSync(path.resolve(baseDir, "package.json"), "utf8"))
}

const packageJsonDir = path.resolve(__dirname, "..")
const packageJson = readPackageJson(packageJsonDir);

const root = commandpost
  .create<{}, {}>("cowlick")
  .version(packageJson.version, "-v, --version")
  .action(() => {
    process.stdout.write(root.helpText() + "\n");
  });

interface ExportArgs {
  target: string;
}

root
  .subCommand<{}, ExportArgs>("electron [target]")
  .description("export to electron")
  .action((opts, args) => {
    const baseDir = path.resolve(process.cwd(), args.target);
    const targetPackageJson = readPackageJson(baseDir);
    replaceIndex(baseDir, targetPackageJson);
    const templateDir = path.join(packageJsonDir, "template");
    copyTemplate(templateDir, baseDir, targetPackageJson);
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