
var bootState = {
    preload: function() {
        game.load.image('playButton', './assets/play.png');
        game.load.image('grid', './assets/grid.png');
        game.load.image('moto', './assets/moto.png');
        game.load.audio('testmusic', ['./assets/sound/musaa.ogg']);
        game.load.image('synthline', 'assets/sprites/line.png');
    },
    create: function() {
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.state.start('intro');
    }
};
