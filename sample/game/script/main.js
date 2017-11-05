"use strict";

module.exports = function() {
  var scene = new g.Scene({game: g.game});
  scene.loaded.add(() => {
    var rect = new g.FilledRect({
      scene: scene,
      cssColor: "#ff0000",
      width: 32,
      height: 32
    });
    scene.append(rect);
  });
  g.game.pushScene(scene);
}
