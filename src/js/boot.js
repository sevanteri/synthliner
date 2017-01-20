

var bootState = {
    preload: function() {
        game.load.image('playButton', './assets/play.png');
        game.load.image('grid', './assets/grid.png');
        game.load.image('moto', './assets/moto.png');
        game.load.audio('testmusic', ['./assets/sound/Keinzweiter_Mircoobee.mp3']);
    },
    create: function() {
        game.state.start('menu');
    }
};
