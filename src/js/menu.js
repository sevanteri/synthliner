
var menuState = {
    create: function() {
        var texti = game.add.button(game.world.centerX, 20, 'playButton', this.startGame, this);
        texti.anchor.setTo(0.5, 0);
    },

    startGame: function() {
        menumusic.stop();
        game.state.start('play');
    }
};
