var playState = {
    create: function() {
        var that = this;
        // **************    GAME STUFF **************
        this.syntwave = null;
        this.soundLevel = 0;

        this.bg = game.add.sprite(0, 0, 'grid');

        this.music = game.add.audio('testmusic');

        // ****************    Music   **********************
        this.filter = this.music.context.createBiquadFilter();
        this.analyser = this.music.context.createScriptProcessor(0,1,1);

        var filterval = 0.05;
        this.filter.type = 'bandpass';
        this.filter.frequency.value = 200;
        this.filter.gain.value = filterval;
        //console.log(filterval);

        //music.masterGainNode.disconnect();
        this.music.masterGainNode.connect(this.filter);
        //music.masterGainNode.connect(analyser);
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
            //console.log(that.soundLevel);
            //
            that.soundLevel = max;
            // console.log(max);
        };
        this.music.loopFull();

        // ****************    Synthwave   **********************
        var length = 354 / 80;
        this.wavePoints = [];

        this.syntwavePointGroup = game.add.physicsGroup();

        for (var i = 0; i < 80; i++) {
            this.wavePoints.push(new Phaser.Point(0, i * length));
            this.syntwavePointGroup.create(this.wavePoints[i]);
        }
        this.syntwave = game.add.rope(this.game.world.centerX, 0, 'synthline', null, this.wavePoints);
        //syntwave.scale.set(0.8);

        this.syntwave.updateAnimation = function() {
            for (var i = that.wavePoints.length - 1; i > 0; i--) {
                that.wavePoints[i].x = that.wavePoints[i - 1].x;

            }
            // sound level is in range of [-40, 0]
            that.wavePoints[0].x = (that.soundLevel) * that.game.world.width - that.game.world.width/2;
        };

        // ****************    Touch   **********************
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'touchSprite');
        this.player.scale.set(0.05);
        this.player.anchor.setTo(0.5, 0.5);
    },
    // ----------------- UPDATE -----------------------
    update: function() {
      this.movePlayerToPointer();
      this.checkTouchCollision();
    },
    // --------------- RENDER ------------------------
    render: function() {

    },
    movePlayerToPointer: function() {
      // Update player coordinates to pointer
      this.player.x = game.input.x;
      this.player.y = game.input.y;
    },
    checkTouchCollision: function() {
      var collided = false;
      var touchSize = 40;
      var lineSize = 40;
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
