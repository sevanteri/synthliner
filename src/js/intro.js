var introState = {
    create: function() {
        var startbutton = game.add.button(20, 40, 'playButton', this.startGame, this);
    },

    startGame: function() {
        game.scale.startFullScreen(false);
        game.state.start('menu');
    }
};
