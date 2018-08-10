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
    this.load.audio('title', 'assets/music/Mercury.mp3');
    this.load.audio('win', 'assets/music/WinJingle.mp3');
    this.load.audio('game', 'assets/music/Venus.mp3');
    this.load.audio('gameChill', 'assets/music/thecharm68.mp3');
    this.load.audio('gameover', 'assets/music/Map.mp3');
    this.load.audio('intro', 'assets/music/IntroJingle.mp3');
    this.load.audio('warp', 'assets/music/WarpJingle.mp3');
  }

  create() {
    this.scene.start('SceneTitle');
  }
}