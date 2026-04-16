import * as Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  init(data){
    this.currentScore = data?.score || 0;

    const savedData = localStorage.getItem("flappyBirdSave");
    this.bestScore = 0;
    
    if(savedData !== null) {
      this.bestScore = JSON.parse(savedData).score;
    }
    
    if(this.currentScore > this.bestScore) {
      localStorage.setItem("flappyBirdSave", JSON.stringify({
        score: this.peakScore,
        date: new Date().toISOString()
      }));
    }
  }

  create(){
    let title = this.add
      .text(400, 300, "Skor Kamu: " + this.currentScore + "\n\nPeak Score: " + this.bestScore + "\n\nKlik layar untuk bermain lagi", {
        fontSize: "32px",
        align: "center",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

      this.input.once(
      "pointerdown",
      function () {
        this.scene.start("GameScene");
      },
      this,
    );
  }
}