var introState = {
    create: function() {
        this.music = game.add.audio('intromusic');
        this.music.loopFull();

        this.bling = new Phaser.Rectangle(0, 0,
                                          game.world.width,
                                          game.world.height);


        game.add.text(0, 0, "introtexti", {font:"12px Arial", fill:"#eee"});

        this.game.input.onDown.addOnce(this.startGame, this);
    },

    blingWhite: function() {

    },

    blingBlack: function() {

    },

    startGame: function() {
        this.music.stop();
        // play bling
        game.scale.startFullScreen(false);
        this.reallyStart();
    },

    reallyStart: function() {
        game.state.start('menu');
    }
};
