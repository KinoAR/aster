export class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({key:'SceneGameOver'});
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.setupText();
    this.setupRetry();
  }

  setupText() {
    this.gameOverText = this.add.text(330, 250, "Game Over", {
      fontSize: '40px',
      color: 'red',
    });

    this.scoreTitleText = this.add.text(310, 300, "Final Score", {
      fontSize: '40px',
      color: 'white'
    });
    console.log("Game Over", this, this.scoreTitleText);
    this.finalScoreText = this.add.text(390, 350, `${this.score}`, {
      fontSize: '40px',
      color: 'white'
    });
  }

  setupRetry() {
    this.input.keyboard.on('keydown_ENTER', () => {
      this.scene.start("SceneGame");
    })
  }

  update() {

  }
}