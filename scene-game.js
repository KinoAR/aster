import {Cruiser} from './cruiser.js';
import {BattleShip} from './battleship.js';
import {EnemyPatterns} from "./enemypatterns.js";
export class SceneGame extends Phaser.Scene {
  constructor() {
    super({key:'SceneGame'});
  }

  preload() {

  }

  create() {
    this.startMusic();
    this.currentPattern = [];
    this.startCoordinates = {x:300, y: 300};
    this.invincibleWait = 120;
    this.invincibleTime = 0;
    this.died = false;
    const {x, y} = this.startCoordinates;
    this.player = this.physics.add.sprite(x,y, 'ship');
    this.player.body.checkCollision.all = true;
    this.player.body.onCollide = true;
    this.createEnemies();
    this.setupCollisionDetection();
    this.setupOverlapDetection();
    this.setupEvents();
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
    this.score = 0;
    this.scoreText = this.add.text(50, 40, `Score:  ${this.score}`);
    this.livesText = this.add.text(50, 60, `Lives:  ${this.lives}`);
  }

  startMusic() {
    this.sound.stopAll();
    this.sound.play('game',{loop:true});
  }

  setupCollisionDetection() {
    this.physics.world.on('collide', (collision, initialObject) => {
      if(initialObject instanceof BattleShip || initialObject instanceof Cruiser) {
        collision.body.checkCollision.all = false;
        setTimeout(() => {
          if(!R.isNil(collision.body))
            collision.body.checkCollision.all = true;
        }, 1500);

        if(this.invincibleTime <= 0) {
          const {x, y} = this.startCoordinates;
          collision.body.reset(x, y);
          initialObject.die();
          this.lives = R.clamp(0, 99, this.lives - 1);
          this.died = true;
          this.invincibleTime = this.invincibleWait;
          if(this.lives <= 0) {
            this.player.visible = false;
            this.events.emit("gameOver");
          }
        }
      }
    });
  }

  setupOverlapDetection() {
    this.physics.world.on('overlap', (overlap, initialObject) => {
      if(initialObject instanceof BattleShip || initialObject instanceof Cruiser) {
        initialObject.die();
      }
    });
  }

  setupEvents() {
    this.events.once('gameOver', () => {
      this.sound.stopAll();
      this.sound.play('warp');
      setTimeout(() => {
        this.scene.start('SceneGameOver', {
          score: this.score
        });
      }, 1750);
    })
  }

  update() {
    this.processDeathInvincible();
    this.processCoolDowns();
    this.processBulletControls();
    this.processEnemyMovement();
    this.processEnemyCreation();
    this.updateGameText();
  }

  processDeathInvincible() {
    if(this.died === true)
      this.invincibleTime = 
        R.clamp(0, this.invincibleWait, this.invincibleTime - 1);
    
    if(this.invincibleTime <= 0 && this.died === true) {
      this.died = false;
    }
  }

  processEnemyCreation() {
    const enemyOffScreen = (enemy) => !R.isNil(enemy) ? enemy.x < 0 : false;
    const enemyInvisible = (enemy) => !R.isNil(enemy) ? enemy.visible === false : false;
    if(!R.isEmpty(this.currentPattern)) {
      if (R.any(enemyOffScreen)(this.currentPattern)) {
        this.removePreviousEnemies();
        this.createEnemies();
      }
    }

    if(R.all(enemyInvisible)(this.currentPattern)) {
      this.removePreviousEnemies();
      this.createEnemies();
    }
  }

  removePreviousEnemies() {
    this.currentPattern.forEach(enemy => enemy.destroy());
    this.currentPattern.length = 0;
  }

  createEnemies() {
    const pattern = EnemyPatterns[ Math.floor(Math.random() * EnemyPatterns.length)];
    const enemies = pattern.map(enemyData => {
      const {y, type} = enemyData;
      return enemyData.type === 'enemy1' ? new Cruiser(this, 850, y, type) 
      : new BattleShip(this, 850,  y, type);
    });
    enemies.forEach( enemy => {
      const enemySprite = this.add.existing(enemy);
      this.physics.add.existing(enemySprite);
      this.physics.add.collider(this.player, enemySprite);
      enemySprite.body.immovable = true;
      enemySprite.body.checkCollision.left = true;
      enemySprite.once('death', () => {
        this.score += enemySprite.getScoreAmount();
        enemySprite.die();
      });
    });
    this.currentPattern = enemies;
  }

  processCoolDowns() {
    this.bulletCooldown-=1;
  }

  processBulletControls() {
     if (this.key.isDown) {
       this.firePlayerBullet();
     }
  }

  processEnemyMovement() {
    this.currentPattern.forEach(enemy => {
      if (!R.isNil(enemy)) {
        enemy.update();
      }
    })
  }

  updateGameText() {
    this.livesText.setText(`Lives:  ${this.lives}`)
    this.scoreText.setText(`Score: ${this.score}`);
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
      bullet.body.onOverlap = true;
      this.currentPattern.forEach(enemy => {
        if(!R.isNil(enemy)) {
          this.physics.add.overlap(bullet, enemy);
        }
      });
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