
var menuState = {
    create: function() {
        var texti = game.add.button(20, 20, 'playButton', this.startGame, this);
    },

    startGame: function() {
        game.state.start('play');
    }
};
