"use strict";

(window as any).eval = global.eval = function() {
  throw new Error("not support eval() for security reasons");
};