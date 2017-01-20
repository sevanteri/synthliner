
var menuState = {
    create: function() {
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        var texti = game.add.button(20, 20, 'playButton', this.startGame, this);
    },

    startGame: function() {
        game.state.start('play');
        game.scale.startFullScreen(false);
    }
};
