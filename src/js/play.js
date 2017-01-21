var playState = {
    create: function() {
        var that = this;
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
        var points = [];

        for (var i = 0; i < 80; i++) {
            points.push(new Phaser.Point(0, i * length));
        }
        this.syntwave = game.add.rope(this.game.world.centerX, 0, 'synthline', null, points);
        //syntwave.scale.set(0.8);

        this.syntwave.updateAnimation = function() {
            for (var i = this.points.length - 1; i > 0; i--) {
                this.points[i].x = this.points[i - 1].x;
            }
            // sound level is in range of [-40, 0]
            this.points[0].x = (that.soundLevel) * that.game.world.width - that.game.world.width/2;
        };

        // ****************    Touch   **********************
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'touchSprite');
        this.player.scale.set(0.05);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.anchor.setTo(0.5, 0.5);
    },
    update: function() {
      this.movePlayerToPointer();
    },
    movePlayerToPointer: function() {
      // Update player coordinates to pointer
      this.player.x = game.input.x;
      this.player.y = game.input.y;
    }
};
