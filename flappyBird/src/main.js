import * as Phaser from "phaser";
import { MainMenu } from "./MainMenu.js";
import { GameScene } from "./GameScene.js";
import { GameOverScene } from "./gameOverScene.js";

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 700 },
      debug: false,
    },
  },
  scene: [MainMenu, GameScene, GameOverScene],
  autoFocus: true,
};

const game = new Phaser.Game(config);

