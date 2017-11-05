"use strict";
import * as path from "path";
import {Package} from "./Package";

export function maindir(baseDir: string, pkg: Package): string {
  return path.dirname(path.resolve(baseDir, pkg.main));;
}