
var playState = {
    create: function() {
        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);

        var music = game.add.audio('testmusic');

        var filter = music.context.createBiquadFilter();
        var analyser = music.context.createScriptProcessor(1024,1,1);
        var filterval = 0.05;
        filter.type = 'bandpass';
        filter.frequency.value = 100;
        filter.gain.value = filterval;
        console.log(filterval);
        
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
            soundLevel = 20*Math.log(Math.max(max,Math.pow(10,-72/20)))/Math.LN10;
            console.log(soundLevel);
	    };

        music.play();
    }
};
