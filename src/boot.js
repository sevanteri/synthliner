

var bootState = {
    preload: function() {
        game.load.image('logo', 'phaser.png');
    },
    create: function() {
        game.state.start('menu');
    }
};
