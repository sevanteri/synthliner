var introState = {
    create: function() {
        var title = game.add.image(this.game.world.centerX, 
                                   90,
                                   'title');
        title.anchor.setTo(0.5, 0.5);
        title.scale = {x:0, y:0};

        tw = game.add.tween(title.scale);
        tw.to({x: 1, y: 1}, 1000, Phaser.Easing.Linear.None);
        tw.start();

        var startbutton = game.add.button(this.game.world.centerX, 200, 'playButton', this.startGame, this);
        startbutton.anchor.setTo(0.5, 0.5);

        startbutton.scale = {x:0, y:0};
        tw2 = game.add.tween(startbutton.scale);
        tw2.to({x: 1, y: 1}, 1000, Phaser.Easing.Linear.None);
        tw2.start();
    },

    startGame: function() {
        game.scale.startFullScreen(false);
        game.state.start('menu');
    }
};
