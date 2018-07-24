export class SceneBoot extends Phaser.Scene {
  constructor() {
    super({key:'SceneBoot'});
  }

  preload() {
    this.load.image('ship', 'assets/spaceship.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('enemybullet', 'assets/enemybullet.png');
    this.load.image('enemy1', 'assets/enemy1.png');
    this.load.image('enemy2', 'assets/enemy2.png');
  }

  create() {
    this.scene.start('SceneTitle');
  }
}