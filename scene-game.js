import {Cruiser} from './cruiser.js';
import {BattleShip} from './battleship.js';

export class SceneGame extends Phaser.Scene {
  constructor() {
    super({key:'SceneGame'});
  }

  preload() {

  }

  create() {
    this.player = this.physics.add.sprite(400, 250, 'ship');
    this.enemyCruiser = this.add.existing(new Cruiser(this, 500, 250, 'enemy1'));
    this.enemyBattleShip = this.add.existing(new BattleShip(this, 500, 300, 'enemy2'));
    this.physics.add.existing(this.enemyBattleShip);
    this.physics.add.existing(this.enemyCruiser);
    console.log(this.enemyCruiser);
    this.player.setAngle(90);
    this.player.setCollideWorldBounds(true);
    this.playerBullets = [];
    this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.processPlayerControls();

    this.bulletWait = 5;
    this.bulletCooldown = this.bulletWait;
    this.bulletSpeed = 400;
    this.playerBulletCap = 15;
    this.lives = 3;
    this.scoreText = this.add.text(50, 40, "Score:  0");
    this.livesText = this.add.text(50, 60, `Lives:  ${this.lives}`);
  }

  update() {
    this.processCoolDowns();
    this.processBulletControls();
    this.processEnemyMovement();
    this.livesText.setText(`Lives:  ${this.lives}`)
  }

  processEnemyCreation() {
    
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

  processEnemyMovement() {
    this.enemyBattleShip.update();
    this.enemyCruiser.update();
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