export class BattleShip extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame=undefined) {
    super(scene, x, y, texture, frame);
    this.setAngle(-90);
  }

  update() {
    super.update();
    this.body.velocity.x = -200;
  }
}