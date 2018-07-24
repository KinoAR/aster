export class SceneGame extends Phaser.Scene {
  constructor() {
    super({key:'SceneGame'});
  }

  preload() {

  }

  create() {
    this.lives = 3;
    this.scoreText = this.add.text(50, 40, "Score:  0");
    this.livesText = this.add.text(50, 60, `Lives:  ${this.lives}`);

    this.player = this.physics.add.sprite(400, 250, 'ship');
    this.player.setAngle(90);
    this.player.setCollideWorldBounds(true);
    this.playerBullets = [];
  }

  update() {
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
    this.input.keyboard.on('keydown_Z', () => {

    });

    this.livesText.setText(`Lives:  ${this.lives}`)
  }
}