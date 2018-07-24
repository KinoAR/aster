import {SceneBoot} from "./scene-boot.js"
import {SceneTitle} from "./scene-title.js";
import {SceneGame} from "./scene-game.js";
import {SceneGameOver} from "./scene-gameover.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },scene: [SceneBoot, SceneTitle, SceneGame, SceneGameOver],
};

const game = new Phaser.Game(config);