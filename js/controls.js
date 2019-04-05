function setEventListeners() {

//Player faces mouse pointer, and enemies face user
document.onmousemove = e => {
  var rect = canvas.getBoundingClientRect();
  var angle = getAngleBetween(
    { x: e.clientX - rect.left, y: e.clientY - rect.top },
    { x: player.x, y: player.y }
  );
  updatePlayerPos(angle);
};

//Player shoots
document.onmousedown = e => {
  var rect = canvas.getBoundingClientRect();
  shotsFired.push(player.shoot(e.clientX - rect.left, e.clientY - rect.top));
};

//Player moves
var keys = {};

document.onkeydown = e => {
  if ([65, 68, 87, 83].indexOf(e.keyCode) >= 0) {
    e.preventDefault();
    keys[e.keyCode] = true;
  }
  var nextX = 0,
    nextY = 0;

  if (keys[65]) {
    nextX = -1;
  }
  if (keys[68]) {
    nextX = 1;
  }
  if (keys[87]) {
    nextY = -1;
  }
  if (keys[83]) {
    nextY = 1;
  }
  player.move(nextX, nextY);
  updatePlayerPos(player.rotation);
};

document.onkeyup = e => {
  if ([65, 68, 87, 83].indexOf(e.keyCode) >= 0) {
    keys[e.keyCode] = false;
  }
};
}