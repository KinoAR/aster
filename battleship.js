export class BattleShip extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame=undefined) {
    super(scene, x, y, texture, frame);
    this.deathTime = 1500;
    this.setAngle(-90);
  }

  update() {
    super.update();
    if (!R.isNil(this.body))
      this.body.velocity.x = -200;
  }

  die() {
    if (!R.isNil(this.body)) {
      this.body.checkCollision.all = false;
      this.body.onCollide = false;
      this.alpha = 0;
      setTimeout(() => {
        this.destroy();
      }, this.deathTime);
    }
  }
}