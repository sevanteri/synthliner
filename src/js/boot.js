

var bootState = {
    preload: function() {
        game.load.image('logo', './assets/phaser.png');
    },
    create: function() {
        game.state.start('menu');
    }
};
