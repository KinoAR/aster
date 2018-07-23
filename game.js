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

function preload() {
  this.load.image('ship', 'assets/ship.png');
  this.load.image('asteroid1', 'assets/asteroid1.png');
  this.load.image('asteroid2','assets/asteroid2.png');
  this.load.image('asteroid3', 'assets/asteroid3.png');
}

function create() {

}

function update() {
  this.input.keyboard.on('keydown_DOWN', () => {
    this.paddle1.body.velocity.y = paddleSpeed;
  });
  this.input.keyboard.on('keyup_DOWN', () => {
    this.paddle1.body.velocity.y = 0;
  })
  this.input.keyboard.on('keydown_UP', () => {
    this.paddle1.body.velocity.y = -paddleSpeed;
  });
  this.input.keyboard.on('keyup_UP', () => {
    this.paddle1.body.velocity.y = 0;
  })
}