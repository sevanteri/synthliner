var introState = {
    create: function() {
        this.music = game.add.audio('intromusic');
        this.music.loopFull();

        game.add.text(0, 0, "introtexti", {font:"12px Arial", fill:"#eee"});

        this.g = game.add.graphics(0, 0);
        this.g.beginFill('#FFFFFF');
        this.g.drawRect(0,0, game.world.width, game.world.height);
        this.g.alpha = 0;

        this.game.input.onDown.addOnce(this.startGame, this);
    },

    startGame: function() {
        this.music.stop();
        game.add.audio('startBling').play();
        // play bling
        game.scale.startFullScreen(false);

        fadeObj(this.g, 1, this.reallyStart);
    },

    reallyStart: function() {
        game.state.start('menu');
    }
};
