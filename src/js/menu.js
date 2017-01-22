
var menuState = {
    create: function() {
        this.music = game.add.audio('menumusic');
        this.music.loopFull();

        this.startButton = game.add.button(game.world.centerX, 160, 'playButton', this.startGame, this);
        this.startButton.anchor.setTo(0.5, 0);
        this.startButton.scale = {x:0, y:0};
        this.startButton.animations.add('bling', null, 4, false);
        this.startButton.animations.add('asdf', [0], 0, false);
        this.startButton.animations.getAnimation('bling').onComplete.add(function() {

            this.startButton.animations.play('asdf');
            game.time.events.add(Phaser.Timer.SECOND * Math.floor(1 + Math.random() * 4), function() {
                this.startButton.animations.play('bling');
            }, this);

        }, this);
        this.startButton.animations.play('bling');


        this.title = game.add.image(game.world.centerX,
                                   90,
                                   'title');
        this.title.anchor.setTo(0.5, 0.5);
        this.title.scale = {x:0, y:0};

        this.title.animations.add('bling', [0,1,2,3,4,5,6,0,0,0], 12, false);
        this.title.animations.add('nope', [0], 0, false);
        this.title.animations.getAnimation('bling').onComplete.add(function() {

            this.title.animations.play('nope');
            game.time.events.add(Phaser.Timer.SECOND * Math.floor(1 + Math.random() * 4), function() {
                this.title.animations.play('bling');
            }, this);

        }, this);
        this.title.animations.play('bling');

        scaleObj(this.title, 1);
        scaleObj(this.startButton, 1);
        fadeObj(this.startButton, 1);

        this.headphone = game.add.text(this.game.world.centerX,
                                      this.game.world.height - 40,
                                      "Playing with headphones\nis recommended",
                                      {font: "14px bold Arial",
                                          align: 'center',
                                          fill: "#EEEEEE"});
        this.headphone.anchor.setTo(0.5, 0.5);
        this.headphone.alpha = 0;
        this.headphone.scale = {x:0, y:0};
        scaleObj(this.headphone, 1);
        fadeObj(this.headphone, 1);

    },

    startGame: function() {
        if (!game.scale.isFullScreen) {
            game.scale.startFullScreen(false);
            return;
        }

        this.music.stop();
        fadeObj(this.headphone, 0);
        scaleObj(this.title, 5);
        fadeObj(this.title, 0);
        scaleObj(this.startButton, 0, this.reallyStart);
    },

    reallyStart: function() {
        game.state.start('play');
    }
};
