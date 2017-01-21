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

        this.bg = game.add.sprite(0, 0, 'grid');
        this.music = game.add.audio('stage_music_1');

        this.game.onPause.add(function() {
            this.music.pause();
        }, this);

        this.game.onResume.add(function() {
            this.music.loopFull();
        }, this);

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
            if(that.sampleSkipCounter % 2 === 0) {
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
        this.music.loopFull();

        // ****************    Synthwave   **********************
        var motoOffset = 32;
        var length = (354 - motoOffset) / 80;
        this.wavePoints = [];
        this.lastPoint = game.world.centerX;

        for (var i = 0; i < 80; i++) {
            this.wavePoints.push(new Phaser.Point(0, motoOffset + i * length));
        }
        this.syntwave = game.add.rope(this.game.world.centerX, 0, 'synthline', null, this.wavePoints);
        //syntwave.scale.set(0.8);

        this.motoShadows = [];
        for (i = 0; i < 4; i++) {
            var spr = game.add.sprite(-100, motoOffset/2, 'moto');
            spr.anchor.setTo(0.5, 0.5);
            spr.alpha = 0.8 - 0.2 * i;
            this.motoShadows.push(spr);
        }
        this.moto = game.add.sprite(this.game.world.centerX, 16, 'moto');
        this.moto.anchor.setTo(0.5, 0.5);

        this.syntwave.updateAnimation = function() {
            that.lastPoint = that.wavePoints[0].x;
            for (var i = that.wavePoints.length - 1; i > 0; i--) {
                that.wavePoints[i].x = that.wavePoints[i - 1].x;

            }
            // sound level is in range of [0, 1]
            var bpm = 60;
            that.sineWaveCounter = that.sineWaveCounter + game.time.physicsElapsed;
            var sinewavevalue = that.sineWaveCounter / bpm * 60 * (Math.PI / 2);
            this.points[0].x = (0.15 + that.soundLevel / 2 + ((Math.sin(sinewavevalue) + 1) / 2 *0.5)) * that.game.world.width*1.2 - that.game.world.width/2;
        };

        // **************** Particle emitter ****************
        this.emitter = game.add.emitter(game.world.centerX, 200, 200);
        this.emitter.makeParticles(['particle', 'particle2', 'particle3']);
        this.emitter.setAlpha(0.3, 0.8);
        this.emitter.setScale(0.5, 1);
        this.emitter.gravity = 5000;

        // ****************    Touch   **********************
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'touchSprite');
        this.player.anchor.setTo(0.5, 0.5);
      },
      motoShadowTimer: 0,
      moveMotoToLine: function() {
          this.motoShadowTimer += game.time.physicsElapsed;
          if (this.motoShadowTimer >= 0.1) {
              this.motoShadowTimer = 0;
              for (i = this.motoShadows.length - 1; i > 0; i--) {
                  this.motoShadows[i].x = this.motoShadows[i - 1].x;
              }
              this.motoShadows[0].x = this.moto.x;
          }
          this.moto.x = this.game.world.centerX + this.lastPoint;
    },
    // ----------------- UPDATE -----------------------
    update: function() {
      this.movePlayerToPointer();
      this.collides = this.checkTouchCollision();
      this.moveMotoToLine();
    },
    movePlayerToPointer: function() {
      // Update player coordinates to pointer
      this.player.x = game.input.x;
      this.player.y = game.input.y;
      this.emitter.x = game.input.x;
      this.emitter.y = game.input.y;
      if(this.sampleSkipCounter % 2 === 0 && this.collides) {
        this.emitter.start(true, 500, 0, Math.random() > 0.5 ? 2 : 1);
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
    }
};
