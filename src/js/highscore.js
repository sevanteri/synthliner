var highScoreState = {
    scores: [],
    scoreParam: 0,

    init: function(score) {
      this.scoreParam = score ;
    },
    create: function() {
      var that = this;
      this.scoreStanding = null;
      var titleFont = {font: "18px bold Arial", align: 'center', fill: "#EEEEEE"};
      var scoreFont = {font: "14px bold Arial", align: 'center', fill: "#EEEEEE"};
      var playerScoreFont = {font: "14px bold Arial", align: 'center', fill: "#cc00cc"};
      
      // Load highscores from localstorage
      if (!window.localStorage) {
          this.scores.push({"score": scoreParam.score, "multipler": scoreParam.multipler});
      } else {
          if(localStorage.getItem("synthLinerScore")) {
            var storageScores = JSON.parse(localStorage.getItem("synthLinerScore"));
            var onList = false;
            // Go through list and check if score can make to the list
            for (var i = 0; i < storageScores.length; i++) {
              if (this.scoreParam.score > storageScores[i].score) {
                this.scoreStanding = i;
                onList = true;
                break;
              }
            }

            if (onList === true) {
              // Put score to the list
              storageScores.splice(this.scoreStanding, 0, this.scoreParam);
            }

            // Push score to the end of the list
            if (onList === false) {
              storageScores.push({"score": that.scoreParam.score, "multipler": that.scoreParam.multipler});
            }

            if(storageScores.length > 5) {
              storageScores.pop();
            }

            // Save it
            localStorage.setItem("synthLinerScore", JSON.stringify(storageScores));
            that.scores = storageScores;

          } else {
            that.scores.push({"score": that.scoreParam.score, "multipler": that.scoreParam.multipler});
            // Save it
            localStorage.setItem("synthLinerScore", JSON.stringify(that.scores));
          }

      }

      this.title = game.add.text(this.game.world.centerX, 10, "HIGHSCORES",titleFont);
      this.title.anchor.setTo(0.5, 0);

      var initialScoreY = 50;
      var scoreTexts = [];
      for(var k = 0; k < this.scores.length; k++) {
        var score = that.scores[k];
        scoreTexts[k] = game.add.text(this.game.world.centerX, initialScoreY, score.score + " - " + score.multipler + "X",k===this.scoreStanding?playerScoreFont:scoreFont);    
        scoreTexts[k].anchor.setTo(0.5, 0);
        initialScoreY += 25;
      }

      this.tapText = game.add.text(this.game.world.centerX, this.game.world.height - 20, "Tap to continue",titleFont);
      this.tapText.anchor.setTo(0.5, 0);

      this.game.input.onTap.add(function() {
          game.state.start('menu');
      }, this);


    },
};
