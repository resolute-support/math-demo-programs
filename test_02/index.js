function startGame() {
    myGamePiece = new circ_component(10, "blue", 10, 120);
    myObstacle  = new component(50, 50, "green", 700, 750);
    myGameArea.start();
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function circ_component(width, color, x, y) {
    this.width = width;
    this.height = width;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.radius = width;
    this.update = function() {
        context = myGameArea.context;
        context.beginPath();
        context.arc(this.x + 10, this.y + 10, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
function updateGameArea() {
    if (myGamePiece.crashWith(myObstacle)) {
        myGameArea.stop();
        document.getElementById("success_modal").style.display = "block";
        document.getElementById("continue").onclick = function () {
          location.reload();
        }
    } else {
        myGameArea.clear();
        myObstacle.update();
        myGamePiece.update();
    }

    if (paused == false)
    {
      vy += gravity;
      myGamePiece.x += vx;
      myGamePiece.y += vy;


      if (myGamePiece.x + myGamePiece.radius >= myGameArea.canvas.width) {
        vx = -vx * damping;
        myGamePiece.x = myGameArea.canvas.width - myGamePiece.radius*2;
        console.log("right wall")
      }

      else if (myGamePiece.x + myGamePiece.radius <= 0) {
        vx = -vx * damping;
        myGamePiece.x = myGamePiece.radius*2;
        console.log("left wall")
      }

      if (myGamePiece.y + myGamePiece.radius >= myGameArea.canvas.height) {
        vy = -vy * damping;
        myGamePiece.y = myGameArea.canvas.height - myGamePiece.radius*2;
        vx *= traction;
        console.log("bottom")
      }

      else if (myGamePiece.y - myGamePiece.radius <= 0) {
        vy = -vy * damping;
        myGamePiece.y = myGamePiece.radius*2;
        console.log("top")
      }
    }

    document.getElementById("x_co").innerHTML = Math.trunc(myGamePiece.x)
    document.getElementById("y_co").innerHTML = Math.trunc(myGameArea.canvas.width-myGamePiece.y)
}
function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}
function toggle() {
  if (paused == true) {
    document.getElementById("toggle_button").innerHTML = "pause";
  }
  else {
    document.getElementById("toggle_button").innerHTML = "play";
  }
  paused = !paused;
}
function get_params() {
  document.getElementById("toggle_button").innerHTML = "pause";
  document.getElementById("telemetry").style.display = "block";
  document.getElementById("toggle_button").style.display = "inline";
  document.getElementById("run_button").innerHTML = "Running...";
  paused = false;
}
