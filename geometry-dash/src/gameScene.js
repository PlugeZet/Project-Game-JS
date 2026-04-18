import * as Phaser from "phaser"
import { loadAssets } from "./loadAssets.js"
import { hitSpike } from "./functions.js"

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" })
    }

    preload(){
        loadAssets(this);
    }

    create(){
        this.spikes = this.physics.add.staticGroup();

        this.speed = 300;
        this.jumpPower = -650;

        this.ground = this.add.tileSprite(1000, 580, 2000, 40, "dirt");
        this.physics.add.existing(this.ground, true);

        for(let i = 1; i <= 5; i++){
            let spike = this.spikes.create(500 + i * 200, 535, "spike").setScale(1.5).refreshBody();
            spike.body.setSize(25, 20);
            spike.body.setOffset(10, 28);
        }
        

        this.player = this.physics.add.sprite(100, 400, "cube");
        this.player.setGravityY(1500);
        this.physics.add.collider(this.player, this.ground);

        this.physics.add.overlap(this.player, this.spikes, hitSpike, null, this);
        
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 5000, 600);

        this.cursor = this.input.keyboard.addKeys({
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        this.input.on("pointerdown", this.jump, this);
    }

    update(){
        this.player.setVelocityX(this.speed);
        if(Phaser.Input.Keyboard.JustDown(this.cursor.jump)){
            this.jump();
        }
    }
    jump() {
  if (this.player.body.touching.down || this.player.body.blocked.down) {
    this.player.setVelocityY(this.jumpPower);
  }
}
}