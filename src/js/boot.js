
var bootState = {
    preload: function() {
        game.load.image('playButton', './assets/play.png');
        game.load.image('grid', './assets/grid.png');
        game.load.image('moto', './assets/moto.png');
        game.load.image('synthline', './assets/line.png');
        game.load.image('title', './assets/title.png');
        game.load.image('touchSprite', './assets/finger.png');

        game.load.audio('testmusic', ['./assets/sound/musaa.ogg']);
        game.load.audio('menumusic', ['./assets/sound/menumusic.ogg']);
    },
    create: function() {
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.state.start('intro');
    }
};
