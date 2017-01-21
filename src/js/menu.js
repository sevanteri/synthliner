
var menuState = {
    create: function() {
        this.music = game.add.audio('menumusic');
        this.music.loopFull();

        this.title = game.add.image(this.game.world.centerX, 
                                   90,
                                   'title');
        this.title.anchor.setTo(0.5, 0.5);
        this.title.scale = {x:0, y:0};

        this.startButton = game.add.button(game.world.centerX, 160, 'playButton', this.startGame, this);
        this.startButton.anchor.setTo(0.5, 0);
        this.startButton.scale = {x:0, y:0};

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
        this.music.stop();
        fadeObj(this.headphone, 0);
        scaleObj(this.title, 5);
        fadeObj(this.title, 0);
        scaleObj(this.startButton, 0, this.reallyStart);
        game.state.start('play');
    },

    reallyStart: function() {
        game.state.start('menu');
    }
};
