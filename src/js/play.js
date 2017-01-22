var playState = {
    create: function() {
        var that = this;
        // **************    GAME STUFF **************
        this.syntwave = null;
        this.soundLevel = 0.5;
        this.difficulty = 1;
        this.sampleSkipCounter = 0;
        this.treshold = 0.00;
        this.sineWaveCounter = 0;
        this.bpm = 60;
        this.bgSpeed = 2;
        this.scoreNumber = 0;
        this.scoreMultipler = 1;
        this.comboTimer = 0;
        this.running = true;
        this.highestMultipler = 1;

        this.bg = game.add.tileSprite(0, 0, 200, 354, 'grid');
        this.music = game.add.audio('stage_music_1');
        this.multiplierResetSound = game.add.audio('multiplierBling');

        this.game.onPause.add(function() {
            this.music.pause();
            this.pauseGroup.x = 0;
        }, this);

        this.game.onResume.add(function() {
            game.scale.startFullScreen(false);
            this.music.play();
            this.pauseGroup.x = -500;
        }, this);

        this.game.scale.onFullScreenChange.add(function(scale) {
            if (!scale.isFullscreen) {
                this.game.paused = true;
            }
        }, this);

        game.input.onTap.add(function(){
            this.unpause();
        }, this);

        this.music.onStop.add(function() {
            this.stopGame();
        }, this);

        // background pulse animations
        this.grid_anim1 = game.add.sprite(0, 0, 'grid_anim1');
        this.grid_anim1.animations.add('go');
        this.game.time.events.loop(Phaser.Timer.SECOND, this.showBgAnim, this);

        // ****************    Music   **********************
        this.filter = this.music.context.createBiquadFilter();
        this.analyser = this.music.context.createScriptProcessor(0,1,1);

        var filterval = 1;
        this.filter.type = 'bandpass';
        this.filter.frequency.value = 800;
        this.filter.gain.value = filterval;

        this.music.masterGainNode.gain.value = 2;
        //this.music.masterGainNode.disconnect();

        this.music.masterGainNode.connect(this.filter);
        //this.music.masterGainNode.connect(this.listenFilter);
        // this.filter.connect(this.music.context.destination);
        this.filter.connect(this.analyser);
        this.analyser.connect(this.music.context.destination);

        // Adapted from http://thecodeplayer.com/walkthrough/5b66bac8ec98ba14a80ca0c83169d51f
        this.analyser.onaudioprocess = function(e){
            var out = e.outputBuffer.getChannelData(0);
            var int = e.inputBuffer.getChannelData(0);
            var max = 0;

            for(var i = 0; i < int.length; i++){
                out[i] = 0;
                max = Math.max(int[i], max);
            }
            //convert from magitude to decibel
            // that.soundLevel = 20*Math.log(Math.max(max,Math.pow(10,-72/20)))/Math.LN10;

            that.sampleSkipCounter++;
            if(that.sampleSkipCounter % 3 === 0) {
                that.sampleSkipCounter = 0;
                that.previousSoundLevel = that.soundLevel;
                var delta = that.soundLevel > max ? that.soundLevel - max : max - that.soundLevel;
                delta = delta > that.difficulty ? that.difficulty : delta;
                delta = delta < that.treshold ? 0 : delta;
                that.soundLevel = that.soundLevel > max ? that.soundLevel - delta : that.soundLevel + delta;
            } else {
                that.previousSoundLevel = max;
            }
        };
        this.music.play();

        // ****************    Synthwave   **********************
        this.motoOffset = 32;
        var length = (354 - this.motoOffset) / 80;
        this.wavePoints = [];
        this.lastPoint = {x: game.world.centerX, y:0};

        for (var i = 0; i < 80; i++) {
            this.wavePoints.push(new Phaser.Point(0, this.motoOffset + i * length));
        }
        this.syntwave = game.add.rope(this.game.world.centerX, 0, 'synthline', null, this.wavePoints);
        //syntwave.scale.set(0.8);

        this.motoShadows = this.game.add.group();
        for (i = 0; i < 4; i++) {
            var spr = game.add.sprite(-100, this.motoOffset/2, 'moto');
            spr.anchor.setTo(0.5, 0.5);
            spr.alpha = 0.8 - 0.2 * i;
            this.motoShadows.add(spr);
        }
        this.moto = game.add.sprite(this.game.world.centerX, 16, 'moto');
        this.moto.anchor.setTo(0.5, 0.5);

        this.syntwave.updateAnimation = function() {
            that.lastPoint = this.points[0];

            for (var i = that.wavePoints.length - 1; i > 0; i--) {
                that.wavePoints[i].x = that.wavePoints[i - 1].x;
                that.wavePoints[i].y = that.wavePoints[i - 1].y + length;
            }
            // sound level is in range of [0, 1]

            if (that.running) {
                var bpm = that.bpm;
                that.sineWaveCounter = that.sineWaveCounter + game.time.physicsElapsed;
                var sinewavevalue = that.sineWaveCounter / bpm * 60 * (Math.PI / 2);
                sinewavevalue = that.sineWaveCounter > 10 && parseInt(that.sineWaveCounter) % (bpm / 6) < 5 ? sinewavevalue - 1 + that.sineWaveCounter / bpm * 120 * (Math.PI / 2) : sinewavevalue;
                this.points[0].x = (0.15 + that.soundLevel *0.7 + ((Math.sin(sinewavevalue) + 1) / 2 *0.3)) * that.game.world.width*1.2 - that.game.world.width/2;
            }
        };

        // **************** Particle emitter ****************
        this.emitter = game.add.emitter(game.world.centerX, 200, 200);
        this.emitter.makeParticles(['particle', 'particle2', 'particle3']);
        this.emitter.setAlpha(0.5, 0.8);
        this.emitter.setScale(0.5, 1);
        this.emitter.gravity = 5000;

        // ****************    Touch   **********************
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'touchSprite');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('glow');
        this.player.animations.play('glow', 12, true);

        // ***************     Pause text
        var pauseText = game.add.bitmapText(this.game.world.centerX,
                                            this.game.world.centerY,
                                            'awesomu',
                                            "PAUSED",
                                            38);
        pauseText.anchor.setTo(0.5, 0.5);
        var pauseguide = game.add.bitmapText(this.game.world.centerX,
                                             this.game.world.centerY + 34,
                                             'awesomu',
                                             "Tap to Continue",
                                             20);
        pauseguide.anchor.setTo(0.5, 0.5);

        this.pauseGroup = game.add.group();
        this.pauseGroup.add(pauseText);
        this.pauseGroup.add(pauseguide);
        this.pauseGroup.x = -500;

        // ****************    Texts   **********************
        this.score = game.add.bitmapText(game.world.centerX, game.world.height - 20, 'awesomu',"Score: " + this.scoreNumber + "1X",18);

        this.score.anchor.setTo(0.5, 0.5);


        // ******** pause butan
        this.pauseButton = game.add.button(
            this.game.world.width - 40,
            4,
            'pause',
            function() {
                this.game.paused = true;
            },
            this
        );
    },

    motoShadowTimer: 0,
    moveMotoToLine: function() {
        this.motoShadowTimer += game.time.physicsElapsed;
        if (this.motoShadowTimer >= 0.1) {
            this.motoShadowTimer = 0;
            for (i = this.motoShadows.length - 1; i > 0; i--) {
                this.motoShadows.children[i].x = this.motoShadows.children[i - 1].x;
            }
            this.motoShadows.children[0].x = this.moto.x;
        }
        this.moto.x = this.game.world.centerX + this.lastPoint.x;
        this.moto.y = this.lastPoint.y - this.motoOffset/2;
    },
    showBgAnim: function() {
        // if (Math.random() > 0.5) return;

        // random x and y
        var randX = Math.floor(Math.random() * 12);
        var randY = Math.floor(Math.random() * 20);
        var randR = Math.floor(Math.random() * 4);
        this.grid_anim1.rotation = [0, Math.PI/2, Math.PI, Math.PI/2*3][randR];
        this.grid_anim1.x = 16 * randX;
        this.grid_anim1.y = 16 * randY;
        this.grid_anim1.animations.play('go', 12);
    },
    // ----------------- UPDATE -----------------------
    update: function() {
        if (this.running) {
            this.movePlayerToPointer();
            this.collides = this.checkTouchCollision();

            if (!this.collides && this.scoreMultipler !== 1) {
                this.multiplierResetSound.play();
                this.comboTimer = 0;
                this.scoreMultipler = 1;
                this.updateScore(0);
            }
        }
        this.moveMotoToLine();
        this.bg.tilePosition.y += this.bgSpeed;

        // Check screen orientation
        if(screen.orientation.type == "landscape-primary" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            game.paused = true;
        }
        this.grid_anim1.y += this.bgSpeed;
    },
    movePlayerToPointer: function() {
        // Update player coordinates to pointer
        this.player.x = game.input.x;
        this.player.y = game.input.y;
        this.emitter.x = game.input.x;
        this.emitter.y = game.input.y + 16;
        if(this.sampleSkipCounter % 2 === 0 && this.collides) {
            this.emitter.start(true, 500, 0, Math.random() > 0.5 ? 2 : 1);

            this.updateScore(this.scoreMultipler + Math.floor((this.game.world.height - this.player.y)/10));
            this.comboTimer++;
            if(this.comboTimer > 100) {
                this.comboTimer = 0;
                this.scoreMultipler++;
                if (this.scoreMultipler > this.highestMultipler) {
                  this.highestMultipler = this.scoreMultipler;
                }
            }
        }
    },
    checkTouchCollision: function() {
        var collided = false;
        var touchSize = 20;
        var lineSize = 10;
        var pointNumber = Math.floor(game.input.y / (354 / 80));
        var point = this.wavePoints[pointNumber];
        var playerX = game.input.x;
        var playerY = game.input.y;


        point.realX = game.world.centerX + point.x;
        point.realY = point.y;
        if ((playerX + touchSize) > (point.realX - lineSize) && (playerX - touchSize) < (point.realX + lineSize)){
            collided = true;
        }
        return collided;
    },
    unpause: function(event){
        if(game.paused){
            game.paused = false;
        }
    },
    updateScore: function(score){
        this.scoreNumber += score;
        this.score.setText("Score: " + this.scoreNumber + " " + this.scoreMultipler + "X");
    },
    stopGame: function() {
        var that = this;
        this.running = false;
        this.motoShadows.y = -100;

        this.wavePoints[0].x = 0;

        this.emitter.x = game.world.centerX;
        this.emitter.y = game.world.centerY;
        this.emitter.gravity = 0;

        // center player and teddy
        var playerTween = game.add.tween(this.player);
        playerTween.to({x: this.game.world.centerX,
                        y: this.game.world.height - 50},
                       2000,
                       Phaser.Easing.Circular.EaseInOut);
        playerTween.onComplete.add(function() {
            // crash
            var to = {y: this.game.world.centerY};
            var playerTween = game.add.tween(this.player);
            var motoTween = game.add.tween(this.wavePoints[0]);

            playerTween.to(to);
            motoTween.to(to);

            playerTween.onComplete.add(function() {
                // explosions
                that.emitter.start(true, 1000, 0, 10000);
                var g = game.add.graphics(0, 0);
                g.beginFill(0xFFFFFF);
                g.drawRect(0,0, game.world.width, game.world.height);
                g.endFill();
                g.alpha = 0;
                fadeObj(g, 1, function() {
                    tintObj(g, 0x000000, function() {
                        game.state.start('highScore', true, false, {"score": that.scoreNumber, "multipler": that.highestMultipler});
                    });
                });

            }, this);

            playerTween.start();
            motoTween.start();
        }, this);
        playerTween.start();
        // fade
        // save highscore plus multiplier
        // menu
        // this.game.state.start('menu');
    }
};
