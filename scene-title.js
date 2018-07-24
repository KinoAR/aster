export class SceneTitle extends Phaser.Scene {
  constructor() {
    super({key:'SceneTitle'});
  }

  preload() {

  }

  create() {
    this.scene.start('SceneGame');
  }

  update() {

  }
}