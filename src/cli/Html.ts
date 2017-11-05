"use strict";
import * as fs from "fs";
import * as path from "path";
import * as cheerio from "cheerio";
import {Package} from "./Package";

export function replaceHtmlTitle(html: string, pkg: Package) {
  const $ = cheerio.load(html);
  $("title").text(pkg.name);
  return $.html();
}

export function replaceIndex(baseDir: string, pkg: Package) {
    const htmlDir = path.dirname(path.resolve(baseDir, pkg.main));
    const index = path.join(htmlDir, "index.html");
    const html = fs.readFileSync(index, {encoding: "utf8"});
    fs.writeFileSync(index, replaceHtmlTitle(html, pkg), {encoding: "utf8"});
}
