
var fadeObj = function(obj, to, cb) {
    var tw = game.add.tween(obj);
    tw.to({alpha: to}, 1000, Phaser.Easing.Linear.None, true);
    if (cb) tw.onComplete.add(cb, this);
    tw.start();
};

var scaleObj = function(obj, to, cb) {
    var tw = game.add.tween(obj.scale);
    tw.to({x:to, y:to}, 1000, Phaser.Easing.Linear.None);
    if (cb) tw.onComplete.add(cb, this);
    tw.start();
};
