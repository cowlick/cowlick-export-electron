"use strict";
import * as fs from "fs";
import * as path from "path";
import * as cheerio from "cheerio";
import {Package} from "./Package";
import {maindir} from "./util";

export function replaceHtmlTitle(html: string, pkg: Package) {
  const $ = cheerio.load(html);
  $("title").text(pkg.name);
  return $.html();
}

export function replaceIndex(baseDir: string, pkg: Package) {
    const index = path.join(maindir(baseDir, pkg), "index.html");
    const html = fs.readFileSync(index, {encoding: "utf8"});
    fs.writeFileSync(index, replaceHtmlTitle(html, pkg), {encoding: "utf8"});
}
