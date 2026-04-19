import { loadAssets } from "./loadAssets.js";

export const levels = [
    // Level 1
    [
        "",
        "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    ],
    // Level 2
    [
        "", 
        "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    ],
];

export function createLevel(scene, levelNum) {
    const level = levels[levelNum - 1];
    const ground = scene.add.tileSprite(0, 560, 10000, 40, "ground");
    scene.physics.add.existing(ground, true);
    ground.setCollisionGroup(scene.groundGroup);
    ground.setDepth(2);

    const blockWidth = 64;
    const blockHeight = 64;

    level.forEach((row, rowIndex) => {
        row.split("").forEach((char, colIndex) => {
            if (char === "g") {
                const x = colIndex * blockWidth;
                const y = rowIndex * blockHeight;
                const block = scene.physics.add.sprite(x + blockWidth / 2, y + blockHeight / 2, "block");
                scene.physics.add.collider(scene.player, block);
                scene.blocks.add(block);
            }
        });
    });

    scene.platformDistance = 200;
}
function createBlock(){

}
