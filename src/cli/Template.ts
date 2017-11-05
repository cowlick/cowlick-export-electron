"use strict";
import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import {Package} from "./Package";
import {maindir} from "./util";

export function copyTemplate(templateDir: string, baseDir: string, pkg: Package) {
  fse.copySync(templateDir, maindir(baseDir, pkg));
}