var introState = {
    create: function() {
        menumusic = game.add.audio('menumusic');
        menumusic.loopFull();

        this.title = game.add.image(this.game.world.centerX, 
                                   90,
                                   'title');
        this.title.anchor.setTo(0.5, 0.5);
        this.title.scale = {x:0, y:0};

        this.starttext = game.add.text(this.game.world.centerX, 200,
                                       "Touch to Start",
                                       {font: '18px Arial',
                                           align: 'center',
                                           fill: '#EEEEEE'});
        this.starttext.anchor.setTo(0.5, 0.5);
        this.starttext.scale = {x:0, y:0};

        this.scaleObj(this.title, 1);
        this.scaleObj(this.starttext, 1);
        this.fadeObj(this.starttext, 1);

        this.headphone = game.add.text(this.game.world.centerX,
                                      this.game.world.height - 40,
                                      "Playing with headphones\nis recommended",
                                      {font: "12px Arial",
                                          align: 'center',
                                          fill: "#EEEEEE"});
        this.headphone.anchor.setTo(0.5, 0.5);
        this.headphone.alpha = 0;
        this.headphone.scale = {x:0, y:0};
        this.scaleObj(this.headphone, 1);
        this.fadeObj(this.headphone, 1);

        this.game.input.onDown.addOnce(this.startGame, this);
    },

    fadeObj: function(obj, to, cb) {
        var tw = game.add.tween(obj);
        tw.to({alpha: to}, 1000, Phaser.Easing.Linear.None, true);
        if (cb) tw.onComplete.add(cb, this);
        tw.start();
    },

    scaleObj: function(obj, to, cb) {
        var tw = game.add.tween(obj.scale);
        tw.to({x:to, y:to}, 1000, Phaser.Easing.Linear.None);
        if (cb) tw.onComplete.add(cb, this);
        tw.start();
    },

    startGame: function() {
        game.scale.startFullScreen(false);
        this.fadeObj(this.headphone, 0);
        this.scaleObj(this.title, 5);
        this.fadeObj(this.title, 0);
        this.scaleObj(this.starttext, 0, this.reallyStart);
    },

    reallyStart: function() {
        game.state.start('menu');
    }
};
