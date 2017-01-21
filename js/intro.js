var introState = {
    create: function() {
        this.music = game.add.audio('intromusic');
        this.music.loopFull();

        this.introText = game.add.text(game.world.centerX,
                game.world.height,
                "YEAR 20XX\n" +
                "...\n" +
                "THE INFAMOUS PROTON RIDER,\n" +
                "CODENAME \"FAST TEDDY\", HAS\n" +
                "ESCAPED FROM THE CELLARS OF\n" +
                "THE UNDERWORLD.\n" +
                "\n" +
                "RIDING HIS PROTON BIKE\n" +
                "FABULOUSLY TO THE NEON\n" +
                "COLORED SUNSET, HE\n" +
                "THREATENS TO TEAR APART\n" +
                "THE VERY FABRIC OF TIME\n" +
                "AND SPACE WITH THE\n" +
                "GRAVITATIONAL WAVES.\n" +
                "...\n" +
                "YOU ARE THE SYNTH LINER,\n" +
                "AN ABSTRACT ENTITY\n" +
                "CREATED TO TRACE THE\n" +
                "PROTON RIDER'S SUB-PARTICLE\n" +
                "FUMES TO CANCEL THEIR\n" +
                "EFFECT AND TO SAVE THE\n" +
                "GALAXY.\n" +
                "...\n" +
                "WHAT ARE YOU WAITING\n" +
                "FOR? GO GET HIM!",
                {font:"12px bold Arial", fill:"#eee"});
        this.introText.anchor.setTo(0.5, 0);

        this.tw = game.add.tween(this.introText);
        this.tw.to({y: -1000}, 30000, Phaser.Easing.Linear.None);
        this.tw.onComplete.add(this.startGame, this);
        this.tw.start();

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
