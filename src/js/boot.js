
var bootState = {
    preload: function() {
        game.load.image('playButton', './assets/play.png');
        game.load.image('grid', './assets/grid.png');
        game.load.image('moto', './assets/moto.png');
        game.load.image('synthline', './assets/line.png');
        game.load.image('title', './assets/title.png');
        game.load.image('touchSprite', './assets/finger.png');

        game.load.image('particle', './assets/particle.png');
        game.load.image('particle2', './assets/particle2.png');
        game.load.image('particle3', './assets/particle3.png');
        game.load.image('particle4', './assets/particle4.png');

        game.load.audio('menumusic', ['./assets/sound/menumusic.ogg']);
        game.load.audio('stage_music_1', ['./assets/sound/stage_music_1.ogg']);
    },
    create: function() {
        game.stage.smoothed = false;
        game.scale.forceOrientation(true, false); // force portrait
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.setUserScale(1.5,1.5);
        game.state.start('intro');
    }
};
