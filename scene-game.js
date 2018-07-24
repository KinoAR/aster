export class SceneGame extends Phaser.Scene {
  constructor() {
    super({key:'SceneGame'});
  }

  preload() {

  }

  create() {
    this.bulletWait = 5;
    this.bulletCooldown = this.bulletWait;
    this.bulletSpeed = 400;
    this.playerBulletCap = 15;
    this.lives = 3;
    this.scoreText = this.add.text(50, 40, "Score:  0");
    this.livesText = this.add.text(50, 60, `Lives:  ${this.lives}`);

    this.player = this.physics.add.sprite(400, 250, 'ship');
    this.player.setAngle(90);
    this.player.setCollideWorldBounds(true);
    this.playerBullets = [];
    this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.processPlayerControls();
  }

  update() {
    this.processCoolDowns();
    this.processBulletControls();
    this.livesText.setText(`Lives:  ${this.lives}`)
  }

  processCoolDowns() {
    this.bulletCooldown-=1;
  }

  processBulletControls() {
     if (this.key.isDown) {
       this.firePlayerBullet();
     }
  }

  processPlayerControls() {
      const speed = 250;
      this.input.keyboard.on('keydown_RIGHT', () => {
        this.player.body.velocity.x = speed;
      })
      this.input.keyboard.on('keyup_RIGHT', () => {
        this.player.body.velocity.x = 0;
      });
      this.input.keyboard.on('keydown_LEFT', () => {
        this.player.body.velocity.x = -speed;
      });
      this.input.keyboard.on('keyup_LEFT', () => {
        this.player.body.velocity.x = 0;
      })
      this.input.keyboard.on('keydown_DOWN', () => {
        this.player.body.velocity.y = speed;
      });
      this.input.keyboard.on('keyup_DOWN', () => {
        this.player.body.velocity.y = 0;
      })
      this.input.keyboard.on('keydown_UP', () => {
        this.player.body.velocity.y = -speed;
      });
      this.input.keyboard.on('keyup_UP', () => {
        this.player.body.velocity.y = 0;
      })
  }

  firePlayerBullet() {
    if(this.bulletCooldown <= 0) {
      const {x, y} = this.player;
      const bullet = this.physics.add.sprite(x + this.player.width / 2, y, 'bullet');
      bullet.body.velocity.x = this.bulletSpeed;
      this.bulletCooldown = this.bulletWait;
      this.playerBullets.push(bullet);
      console.log(this.playerBullets.length);
      if(this.playerBullets.length > this.playerBulletCap) {
        this.playerBullets.reverse();
        const oldBullet = this.playerBullets.pop();
        this.playerBullets.reverse();
        oldBullet.destroy();
      }
    }
  }
}