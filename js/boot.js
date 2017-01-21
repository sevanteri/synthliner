
var bootState = {
    preload: function() {
        game.load.image('grid', './assets/grid.png');
        game.load.image('moto', './assets/moto.png');
        game.load.image('synthline', './assets/line.png');
        game.load.image('title', './assets/title.png');

        game.load.image('particle', './assets/particle.png');
        game.load.image('particle2', './assets/particle2.png');
        game.load.image('particle3', './assets/particle3.png');
        game.load.image('particle4', './assets/particle4.png');

        game.load.spritesheet('touchSprite', './assets/finger.png', 32, 32);
        game.load.spritesheet('grid_anim1', './assets/grid_anim1.png', 72, 64);
        game.load.spritesheet('playButton', './assets/play.png', 180, 120);

        game.load.audio('intromusic', ['./assets/sound/intromusic.ogg']);
        game.load.audio('menumusic', ['./assets/sound/menumusic.ogg']);
        game.load.audio('stage_music_1', ['./assets/sound/stage_music_1.ogg']);

        game.load.audio('highscoreBling', ['./assets/sound/fx_newhighscore.ogg']);
        game.load.audio('multiplierBling', ['./assets/sound/fx_resetmultiplier.ogg']);
        game.load.audio('startBling', ['./assets/sound/fx_startgame.ogg']);

        game.load.bitmapFont('awesomu', './assets/font/font.png', './assets/font/font.fnt');
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
