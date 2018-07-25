export class Cruiser extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame=undefined) {
    super(scene, x, y, texture, frame);
    this.setAngle(180);
  }

  update() {
    super.update();
    this.body.velocity.x = -200;
  }
}