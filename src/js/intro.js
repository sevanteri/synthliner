var introState = {
    create: function() {
        this.music = game.add.audio('intromusic');
        this.music.loopFull();

        this.animTime = 30000;

        this.bg = game.add.sprite(0, 0, 'intro');
        this.bg.animations.add('go');
        this.bg.animations.play('go', 2, true);

        this.bgTween = game.add.tween(this.bg);
        this.bgTween.to({x: -200}, this.animTime);
        this.bgTween.start();

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
        this.tw.to({y: -this.introText.height - 20}, this.animTime, Phaser.Easing.Linear.None);
        this.tw.onComplete.add(this.startGame, this);
        this.tw.start();

        this.g = game.add.graphics(0, 0);
        this.g.beginFill(0xFFFFFF);
        this.g.drawRect(0,0, game.world.width, game.world.height);
        this.g.endFill();
        this.g.tint = 0xFFFFFF;
        this.g.alpha = 0;

        this.game.input.onTap.add(function() {
            if (!game.scale.isFullScreen && setFullscreen()) {
                return;
            } else {
                this.startGame();
            }
        }, this);
    },

    startGame: function() {
        this.music.stop();
        game.add.audio('startBling').play();
        // play bling

        var that = this;
        fadeObj(that.g, 1, function() {
            tintObj(that.g, 0x000000, that.reallyStart, 500);
        }, 200);
    },

    reallyStart: function() {
        game.state.start('menu');
    }
};
