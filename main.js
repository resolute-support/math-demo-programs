var ship = new Ship(0,0,50,50);
var station = new Station(randomInt(-250,250),randomInt(-250,0),60,60);

var ship_img = document.getElementById("spaceship");
var station_img = document.getElementById("spacestation");

var closebtns;
var distance;

var orig_x = ship.x;
var orig_y = ship.y;

var move = false;
var move_x;
var move_y;
var portion_y;
var portion_x;
var delta_x;
var delta_y;

function draw() {
  ship.draw();
}
function init() {
  closebtns = document.getElementsByClassName("close");
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
  count();
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.scale(1,-1);
  create_enviroment();
  draw();
  window.requestAnimationFrame(gameLoop);
}
function gameLoop() {

  euclidian_distance();

  if (move == true) {
    clear_canvas();

    if (ship.x < move_x) {
      ship.x += portion_x;
    }
    else if (ship.x > move_x) {
      ship.x -= portion_x;
    }

    if (ship.y < move_y*-1) {
      ship.y += portion_y;
    }
    else if (ship.y > move_y*-1) {
      ship.y -= portion_y;
    }

    if (ship.x == move_x && ship.y == move_y*-1) {
      move = false;
    }

    create_enviroment();
    draw();
    console.log("x is "+ship.x+" and y is "+ship.y*-1);
    check_for_collision();
  }
  window.requestAnimationFrame(gameLoop);
}
async function set_move(x,y) {
  move_x = x;
  move_y = y;
  var x_distance = dist(ship.x,x,0,0);
  var y_distance = dist(0,0,ship.y,y);
  portion_x = x_distance/20;
  portion_y = y_distance/20;
  move=true;
}
function resolveAfter1Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 1000);
  });
}
async function move_ship(x,y) {
  set_move(x,y);
  const result = await resolveAfter1Seconds();
}
function count() {
    document.getElementById("count_mov").innerHTML = "movements used: " + closebtns.length;
}
function error_window(state, type) {
  if (state == "open" && type == "syntax") {
    document.getElementById("error_popup_id").style.display = "block";
    document.getElementById("err_msg").innerHTML="Please make sure your commands are typed correctly"
  }
  else if (state == "open" && type == "empty") {
    document.getElementById("error_popup_id").style.display = "block";
    document.getElementById("err_msg").innerHTML="Please add movements to the list to move the spaceship"
  }
  else {
    document.getElementById("error_popup_id").style.display = "none";
  }
}
function add_mov() {
  const newNode = document.createElement("li");
  const content = '<input class="input_commands"></input>'+'<span class="close">&times;</span>';
  newNode.innerHTML = content;
  const list = document.getElementById("MyUl");
  list.insertBefore(newNode, list.children[list.children.length]);
    count();
    for (i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener("click", function() {
      this.parentElement.remove();
      count();
    });
  }
}
function reset_list() {
  document.getElementById("MyUl").innerHTML = "";
  count();
  ship.x = orig_x;
  ship.y = orig_y;
  move=false;
  clear_canvas();   //clear canvas
  create_enviroment();
  draw();
}
function create_enviroment() {
  add_axis();
  station.draw();
}
function draw() {
  ship.draw();
}
function add_text(content, x, y) {
  ctx.save();
  ctx.scale(1, -1);
  ctx.fillText(content, x, y)
  ctx.restore();
}
function add_axis() {
  ctx.beginPath();
  ctx.moveTo(canvas.width/2*-1,0);
  ctx.lineTo(canvas.height/2,0);
  ctx.stroke();
  ctx.moveTo(0,canvas.width/2*-1);
  ctx.lineTo(0, canvas.height/2);
  ctx.stroke();

  ctx.font = "16px Arial";
  add_text("+ x",180, -20);
  add_text("- y",10, 180);
  add_text("- x",-200, -20);
  add_text("+ y",10, -180);
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function render() {
  reset_position();
  console.clear();
  error_window("close");
  var elements = document.getElementsByTagName("input");
  if (elements.length != 0) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.color = "black";
    }
  }
  if (elements.length != 0) {
    for (let i = 0; i < elements.length; i++) {
     setTimeout(function timer() {
      if(elements[i].value != "" || elements[i].value != null) {
                 var command = String(elements[i].value);
                 if (command.includes("shift") && command.includes("+") && command.includes("X")) {
                   var numb = command.match(/\d/g);
                   numb = numb.join("");
                   console.log("shift X up "+numb);
                   elements[i].style.color = "green";
                   move_ship(ship.x + numb,ship.y);
                 }
                 else if (command.includes("shift") && command.includes("-") && command.includes("X")) {
                   var numb = command.match(/\d/g);
                   numb = numb.join("");
                   console.log("shift X down "+numb);
                   elements[i].style.color = "green";
                   move_ship(ship.x - numb,ship.y);
                 }
                 else if (command.includes("shift") && command.includes("+") && command.includes("Y")) {
                   var numb = command.match(/\d/g);
                   numb = numb.join("");
                   console.log("shift Y up "+numb);
                   elements[i].style.color = "green";
                   move_ship(ship.x,ship.y+numb)
                 }
                 else if (command.includes("shift") && command.includes("-") && command.includes("Y")) {
                   var numb = command.match(/\d/g);
                   numb = numb.join("");
                   console.log("shift Y down "+numb);
                   elements[i].style.color = "green";
                   move_ship(ship.x,ship.y-numb)
                 }
                 else {
                   elements[i].style.color = "red";
                   error_window("open","syntax");
                 }
             }
 }, i * 1000);
}
  }
  else {
    error_window("open","empty");
  }
}
function reset_position() {
  ship.x = orig_x;
  ship.y = orig_y;
  clear_canvas();   //clear canvas
  create_enviroment();
  draw();
}
function check_for_collision() {


  if (rectIntersect(station.x, station.y, station.w, station.h, ship.x, ship.y, ship.w, ship.h)) {
    document.getElementById("welcome_modal").style.display = "block";
    document.getElementById("welcome_part").style.display = "none";
    document.getElementById("success_part").style.display = "block";
  }
}
function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {

    if (x2 > w1/2 + x1 || x1 > w2/2 + x2 || y2*-1 > h1/2 + y1 || y1*-1 > h2/2 + y2) {
        return false;
    }
    else {
      return true;
    }
}
function clear_canvas() {
  ctx.clearRect(canvas.width/-2, canvas.width/2, canvas.width*2, canvas.width*-2);
}
function dist (x1, y1, x2, y2) {
  var deltaX = diff(x1, x2);
  var deltaY = diff(y1, y2);
  var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return dist;
};
function diff (num1, num2) {
  if (num1 > num2) {
    return (num1 - num2);
  } else {
    return (num2 - num1);
  }
};
function euclidian_distance() {
  document.getElementById("distance_calc").innerHTML = "Distance from spacestation: " + Math.round(dist(ship.x,ship.y,station.x,station.y*-1)) + " units";
}

































//
