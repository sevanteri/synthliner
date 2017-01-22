
var bootState = {
    preload: function() {
        game.load.image('preload', './assets/progressbar.png');
    },
    create: function() {
        game.stage.smoothed = false;
        game.scale.forceOrientation(true, false); // force portrait
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.setUserScale(1.5,1.5);

        game.state.start('loader');
    }
};
