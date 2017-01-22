var game = new Phaser.Game(200, 354, Phaser.AUTO, 'game');

game.state.add('boot', bootState);
game.state.add('loader', loaderState);
game.state.add('intro', introState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('highScore', highScoreState);

game.state.start('boot');
