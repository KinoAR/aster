export class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({key:'SceneGameOver'});
  }

  preload() {

  }

  create() {
    this.gameOverText = this.add.text(330, 250, "Game Over", {
      fontSize: '40px',
      color: 'red',
    });
  }

  update() {

  }
}