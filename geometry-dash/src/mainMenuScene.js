import * as Phaser from "phaser";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload() {
    this.load.html("mainmenu", "menu.html");
  }

  create() {
    let domElement = this.add.dom(400, 300).createFromCache("mainmenu");
    domElement.node.style.width = "800px";
    domElement.node.style.height = "600px";
    domElement.updateSize();
    domElement.addListener("click");
    domElement.on(
      "click",
      function (event) {
        if (event.target.name == "playBtn") {
          this.scene.start("GameScene");
        }
      },
      this,
    );
  }
}
