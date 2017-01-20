
var menuState = {
    create: function() {
        var texti = game.add.button(80, 80, 'butan', this.startGame, this);
    },

    startGame: function() {
        game.state.start('play');
    }
};
