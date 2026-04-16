import * as Phaser from "phaser";
import { loadAssets } from "./loadAssets.js";
import { spawnPipes, gameOver } from "./functions.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    loadAssets(this);
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, 800, 600, "background").setOrigin(0);
    this.bird = this.physics.add.sprite(300, 300, "flappybird");
    this.angle = 2;
    this.bgSpeed = 1;
    this.speed = 400;
    this.speedUp = 10;

    this.score = 0;
    this.scoreText = this.add
      .text(16, 16, "0", {
        fontSize: "64px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setDepth(10);

    this.cursors = this.input.keyboard.addKeys({
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.input.on(
      "pointerdown",
      function () {
        this.bird.setVelocityY(-300);
      },
      this,
    );

    this.pipes = this.physics.add.group();
    this.time.addEvent({
      delay: 1500,
      callback: () => spawnPipes(this, this.speed),
      callbackScope: this,
      loop: true,
    });
    this.physics.add.overlap(this.bird, this.pipes, gameOver, null, this);
    this.bird.setVelocityY(-300);
  }

  update() {
    this.bg.tilePositionX += this.bgSpeed;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.jump)) {
      this.bird.setVelocityY(-300);
    }
    if (this.bird.body.velocity.y < 0) {
      this.bird.setAngle(-20);
    } else {
      this.bird.angle += this.angle;
      if (this.bird.angle > 45) {
        this.bird.angle = 45;
      }
    }

    if (this.bird.y > 580 || this.bird.y < 0) {
      gameOver.call(this);
    }

    this.pipes.getChildren().forEach(function (pipe) {
      if (pipe.active) {
        if (pipe.x < -50) {
          pipe.destroy();
        }
        if (pipe.isScoringPipe && !pipe.hasScored && pipe.x < this.bird.x) {
          pipe.hasScored = true;
          this.score += 1;
          if (this.score == this.speedUp) {
            this.speedUp = this.score + 10;
            this.speed *= 1.1;
            this.bgSpeed *= 1.1;
          }
          this.scoreText.setText(this.score);
        }
      }
    }, this);
  }
}
