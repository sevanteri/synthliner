
var fadeObj = function(obj, to, cb, d) {
    d = d || 1000;
    var tw = game.add.tween(obj);
    tw.to({alpha: to}, d, Phaser.Easing.Linear.None, true);
    if (cb) tw.onComplete.add(cb, this);
    tw.start();
};

var scaleObj = function(obj, to, cb, d) {
    d = d || 1000;
    var tw = game.add.tween(obj.scale);
    tw.to({x:to, y:to}, d, Phaser.Easing.Linear.None);
    if (cb) tw.onComplete.add(cb, this);
    tw.start();
};

var tintObj = function(obj, to, cb, d) {
    d = d || 1000;
    var tw = game.add.tween(obj);
    tw.to({tint:to}, d, Phaser.Easing.Linear.None);
    if (cb) tw.onComplete.add(cb, this);
    tw.start();
};
