import * as Phaser from "phaser";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  create() {
    let peakScore = 0;
    const rawData = localStorage.getItem("flappyBirdSave");
    if (rawData !== null) {
      const parsedData = JSON.parse(rawData);
      peakScore = parsedData.score;
    }

    this.add
      .text(400, 300, "Flappy Bird Gacor\n\nKlik layar untuk main", {
        fontSize: "32px",
        align: "center",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(16, 16, "Peak score: " + peakScore, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setDepth(10);

    this.input.once(
      "pointerdown",
      function () {
        this.scene.start("GameScene");
      },
      this,
    );
  }
}
