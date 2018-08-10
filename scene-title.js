export class SceneTitle extends Phaser.Scene {
  constructor() {
    super({key:'SceneTitle'});
  }

  preload() {

  }

  create() {
    this.startMusic();
    this.titleText = this.add.text(375, 275, 'Aster', this.createDefaultText());
    this.startText = this.add.text(385, 310, 'Start', 
    Object.assign(this.createDefaultText(),{fontSize: '28px'}));
    this.startText.setInteractive();
    this.startText.on('pointerdown', () => {
      this.sound.play('intro');
      setTimeout(() => {
        this.scene.start('SceneGame');
      }, 1800);
    });
  }

  startMusic() {
    this.sound.stopAll();
    this.sound.play('title', {loop:true});
  }

  createDefaultText() {
    return {
      backgroundColor: 'black',
      color: 'white',
      fontStyle: 'bold',
      fontSize: '36px',
      shadowColor: 'red',
      shadowBlur: 3,
      shadowFill: true,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowStroke: true,
      stroke: 'red',
      strokeThickness: 2
    }
  }

  update() {

  }
}