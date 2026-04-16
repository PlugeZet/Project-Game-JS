import * as Phaser from "phaser";

export function spawnPipes(scene, speed) {
  let spawnX = 850;
  let gapY = Phaser.Math.Between(150, 450);
  let gapSize = Phaser.Math.Between(85, 175);
  let scale = 2;

  let topPipeHead = scene.pipes
    .create(spawnX, gapY - gapSize, "pipe Head")
    .setScale(scale);
  topPipeHead.body.allowGravity = false;
  topPipeHead.setVelocityX(-speed);
  topPipeHead.setFlipY(true);
  topPipeHead.isScoringPipe = true;
  topPipeHead.hasScored = false;
  for (let i = 1; i < 20; i++) {
    let posY = gapY - gapSize - 32 * scale * i;
    if (posY < -50) break;
    let pipeBody = scene.pipes.create(spawnX, posY, "pipe").setScale(scale);
    pipeBody.body.allowGravity = false;
    pipeBody.setVelocityX(-speed);
  }

  let bottomPipeHead = scene.pipes
    .create(spawnX, gapY + gapSize, "pipe Head")
    .setScale(scale);
  bottomPipeHead.body.allowGravity = false;
  bottomPipeHead.setVelocityX(-speed);
  for (let i = 1; i < 20; i++) {
    let posY = gapY + gapSize + 32 * scale * i;
    if (posY > 650) break;
    let pipeBody = scene.pipes.create(spawnX, posY, "pipe").setScale(scale);
    pipeBody.body.allowGravity = false;
    pipeBody.setVelocityX(-speed);
  }
}

export function gameOver() {
  this.bgSpeed = 1;
  this.speed = 400;
  this.speedUp = 10;
  this.bgSpeed = 0;
  this.angle = 0;
  
  const saveScore = {
    score: this.score,
    dateTime: Date.now,
  };
  localStorage.setItem("flappyBirdSave", JSON.stringify(saveScore));
  
  this.physics.pause();
  this.time.delayedCall(
    1000,
    function () {
      this.bgSpeed = 1;
      this.angle = 2;
      this.scene.start("GameOverScene", {
        score: this.score,
      });
    },
    [],
    this,
  );
}
