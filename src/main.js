var game = new Phaser.Game(600, 600, Phaser.AUTO, '');

game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');
