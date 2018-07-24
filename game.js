const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

const game = new Phaser.Game(config);
const speed = 250;
function preload() {
  this.load.image('ship', 'assets/spaceship.png');
  this.load.image('bullet', 'assets/bullet.png');
  this.load.image('enemybullet', 'assets/enemybullet.png');
  this.load.image('enemy1', 'assets/enemy1.png');
  this.load.image('enemy2','assets/enemy2.png');
}

function create() {
  this.lives = 3;
  this.scoreText = this.add.text(50, 40, "Score:  0");
  this.livesText = this.add.text(50, 50,  `Lives:  ${this.lives}`);

  this.player = this.physics.add.sprite(400, 250, 'ship');
  this.player.setAngle(90);
  this.player.setCollideWorldBounds(true);
  this.playerBullets = [];
}

function update() {
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

  this.livesText.setText(`Lives:  ${this.lives}`)
}