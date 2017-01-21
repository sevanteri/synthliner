var introState = {
    create: function() {
        var title = game.add.image(this.game.world.centerX, 
                                   90,
                                   'title');
        title.anchor.setTo(0.5, 0.5);

        var startbutton = game.add.button(20, 160, 'playButton', this.startGame, this);
    },

    startGame: function() {
        game.scale.startFullScreen(false);
        game.state.start('menu');
    }
};
