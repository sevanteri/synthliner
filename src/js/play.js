var playState = {
    soundLevel: 0,
    preload: function() {
        game.load.image('synthline', 'assets/sprites/line.png');
    },
    create: function() {
        var bg = game.add.sprite(0, 0, 'grid');

        var music = game.add.audio('testmusic');

        var filter = music.context.createBiquadFilter();
        var analyser = music.context.createScriptProcessor(1024,1,1);
        var filterval = 0.05;
        filter.type = 'bandpass';
        filter.frequency.value = 100;
        filter.gain.value = filterval;
        //console.log(filterval);

        music.masterGainNode.disconnect();
        music.masterGainNode.connect(filter);
        music.masterGainNode.connect(analyser);
        filter.connect(music.context.destination);
        analyser.connect(music.context.destination);

        // Adapted from http://thecodeplayer.com/walkthrough/5b66bac8ec98ba14a80ca0c83169d51f
        analyser.onaudioprocess = function(e){
            var out = e.outputBuffer.getChannelData(0);
            var int = e.inputBuffer.getChannelData(0);
            var max = 0;

            for(var i = 0; i < int.length; i++){
                out[i] = 0;
                max = int[i] > max ? int[i] : max;
            }
            //convert from magitude to decibel
            this.soundLevel = 20*Math.log(Math.max(max,Math.pow(10,-72/20)))/Math.LN10;
        };

        music.play();

        // Main line
        var syntwave;
        var length = 354 / 20;
        var points = [];

        for (var i = 0; i < 20; i++) {
            points.push(new Phaser.Point(this.game.world.centerX,
                                         this.game.world.height - i * length));
        }
        syntwave = game.add.rope(this.game.world.centerX, 0, 'synthline', null, points);
        //syntwave.scale.set(0.8);

        syntwave.updateAnimation = function() {
            for (var i = this.points.length; i == 1; i--) {
                // ei toimi
                this.points[i].x = this.points[i + 1].x;
                this.points[i].x = this.game.world.centerX - this.soundLevel*20;
            }
        };
    }
};
