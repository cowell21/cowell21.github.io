Function.prototype.inherits = function (superClass) {
  function Surrogate () {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
};

(function (root) {

  var App = root.App = (root.App || {});
  var MovingObject = App.MovingObject;

  var Bullet = App.Bullet = function (pos, vel){
    var color = Bullet.COLOR;
    var rad = Bullet.RADIUS;
    MovingObject.call(this, pos, vel, color, rad);
  }

  Bullet.inherits(MovingObject);
  Bullet.RADIUS = 2;
  Bullet.COLOR = "red";

  Bullet.gen = function (shipPos, vel) {
    return new Bullet(shipPos, vel);
  }

})(this);
