function init() {
  // /square();
  //circle();
}
function circle() {
  ready_next_frame();
  document.getElementById("x_co").innerHTML = Math.trunc(cx)
  document.getElementById("y_co").innerHTML = Math.trunc(cy)


  if (!paused)
    requestAnimationFrame(circle);

  if (cx + radius >= canvas.width) {
    vx = -vx * damping;
    cx = canvas.width - radius;
    console.log("right wall")
  }

  else if (cx - radius <= 0) {
    vx = -vx * damping;
    cx = radius;
    console.log("left wall")
  }

  if (cy + radius >= canvas.height) {
    vy = -vy * damping;
    cy = canvas.height - radius;
    vx *= traction;           ///***********
    console.log("bottom")
  }

  else if (cy - radius <= 0) {
    vy = -vy * damping;
    cy = radius;
    console.log("top")
  }

  //-----------------

  //-----------------

  vy += gravity; // <--- this is it


  cx += vx;
  cy += vy;

  ball.beginPath();
  ball.arc(cx, cy, radius, 0, 4 * Math.PI, false);
  ball.fillStyle = 'blue';
  ball.fill();
}
function toggle() {
  paused = !paused;
  circle();
}
function ready_next_frame() {
  ball.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
  ball.fillRect(375, 375, 50, 50);                   //draw rectangle
  ball.fillRect(700, 700, 50, 50);
}
