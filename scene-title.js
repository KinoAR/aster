export class SceneTitle extends Phaser.Scene {
  constructor() {
    super({key:'SceneTitle'});
  }

  preload() {

  }

  create() {
    this.titleText = this.add.text(375, 275, 'Aster', {
        backgroundColor:'black',
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
    );
    this.titleText.setInteractive();
    this.titleText.on('pointerdown', () => {
      this.scene.start('SceneGame');
    });
  }

  update() {

  }
}