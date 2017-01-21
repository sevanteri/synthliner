
var bootState = {
    preload: function() {
        game.load.image('playButton', './assets/play.png');
        game.load.image('grid', './assets/grid.png');
        game.load.image('moto', './assets/moto.png');
        game.load.image('synthline', './assets/line.png');
        game.load.image('title', './assets/title.png');
        game.load.image('touchSprite', './assets/finger.png');
        game.load.image('particle', './assets/particle.png');

        game.load.audio('menumusic', ['./assets/sound/menumusic.ogg']);
        game.load.audio('stage_music_1', ['./assets/sound/stage_music_1.ogg']);
    },
    create: function() {
        game.stage.smoothed = false;
        game.scale.forceOrientation(true, false); // force portrait
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.setUserScale(2,2);
        game.state.start('intro');
    }
};
