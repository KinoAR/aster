export class Cruiser extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame=undefined) {
    super(scene, x, y, texture, frame);
    this.deathTime = 100;
    this.scoreAmount = 100;
    this.setAngle(180);
  }

  update() {
    super.update();
    if(!R.isNil(this.body))
      this.body.velocity.x = -200;
  }

  die() {
    if(!R.isNil(this.body)) {
      this.body.checkCollision.all = false;
      this.body.onCollide = false;
      this.visible = false;
      this.emit("death");
      setTimeout(() => {
        this.destroy();
      }, this.deathTime);
    }
  }

  getScoreAmount() {
    return this.scoreAmount;
  }
}