"use strict";
import assert = require("assert");
import {replaceHtmlTitle} from "../src/cli/Html";

describe("Html", () => {

  it("タイトルを置換できる", () => {
    const pkg = {
      name: "replaced",
      main: "./lib/index.js"
    };
    const target = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>game</title>
</head>
<body>
</body>
</html>`;
    const expected = `<!DOCTYPE html><html><head>
  <meta charset="utf-8">
  <title>replaced</title>
</head>
<body>

</body></html>`;
    assert(replaceHtmlTitle(target, pkg) === expected);
  });
});
