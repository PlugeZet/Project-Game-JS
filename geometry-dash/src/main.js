import * as Phaser from "phaser";
import { MainMenu } from "./mainMenuScene.js";
import { GameScene } from "./gameScene.js";
import { GameOver } from "./gameOverScene.js";

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
      debug: true,
    },
  },
  scene: [MainMenu, GameScene, GameOver],
  // scene: [GameScene, GameOver],
  autoFocus: true,
  parent: "game-container",
  dom: {
    createContainer: true,
  },
};

const game = new Phaser.Game(config);
