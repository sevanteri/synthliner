

var bootState = {
    preload: function() {
        game.load.image('logo', './assets/phaser.png');
        game.load.audio('testmusic', ['./assets/sound/Keinzweiter_Mircoobee.mp3']);
    },
    create: function() {
        game.state.start('menu');
    }
};
