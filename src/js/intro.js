var introState = {
    create: function() {
        this.title = game.add.image(this.game.world.centerX, 
                                   90,
                                   'title');
        this.title.anchor.setTo(0.5, 0.5);
        this.title.scale = {x:0, y:0};

        this.startbutton = game.add.button(this.game.world.centerX, 200, 'playButton', this.startGame, this);
        this.startbutton.anchor.setTo(0.5, 0.5);
        this.startbutton.scale = {x:0, y:0};

        this.scaleObj(this.title, 1);
        this.scaleObj(this.startbutton, 1);

    },

    scaleObj: function(obj, to, cb) {
        var tw = game.add.tween(obj.scale);
        tw.to({x:to, y:to}, 1000, Phaser.Easing.Linear.None);
        if (cb) tw.onComplete.add(cb, this);
        tw.start();
    },

    startGame: function() {
        game.scale.startFullScreen(false);
        this.scaleObj(this.title, 0);
        this.scaleObj(this.startbutton, 5, this.reallyStart);
    },

    reallyStart: function() {
        game.state.start('menu');
    }
};
