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
const speed = 3;
function preload() {
  this.load.image('ship', 'assets/spaceship.png');
  this.load.image('bullet', 'assets/bullet.png');
  this.load.image('asteroid1', 'assets/asteroid1.png');
  this.load.image('asteroid2','assets/asteroid2.png');
  this.load.image('asteroid3', 'assets/asteroid3.png');
}

function create() {
  this.scoreText = this.add.text(50, 40, "Score:  0");
  this.lifeText = this.add.text(50, 50,  "Lives:  0");


}

function update() {
  this.input.keyboard.on('keydown_DOWN', () => {
    this.ship.body.velocity.y = speed;
  });
  this.input.keyboard.on('keyup_DOWN', () => {
    this.ship.body.velocity.y = 0;
  })
  this.input.keyboard.on('keydown_UP', () => {
    this.ship.body.velocity.y = -speed;
  });
  this.input.keyboard.on('keyup_UP', () => {
    this.ship.body.velocity.y = 0;
  })
}