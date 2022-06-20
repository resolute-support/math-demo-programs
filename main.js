let ts;     //  time stamp
let sp;     //  seconds passed
let ots;    //  original time stamp
let fps;    //  frames per second
let ms;     // moving speed

let canvas;
let ctx;

var ship_img = document.getElementById("spaceship");
var station_img = document.getElementById("spacestation");

let orig_x =randomInt(-300,300);          //-162
let orig_y =randomInt(-300,300);          //-31

var collision = false;

// let orig_x = 200;
// let orig_y = 200;

var closebtns;
let all_objects = [
  new Ship(orig_x,orig_y,40,40),
  new Station(randomInt(-300,300),randomInt(-300,300),60,60) //y:5 x:257
];

let obstacles = [];
function init() {
  closebtns = document.getElementsByClassName("close");
  var i;
  count();
  canvas = document.getElementById("canvas")
  ctx = canvas.getContext('2d');                       //create objects to use canvas
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.scale(1,-1);
  create_enviroment();
  draw();
  //window.requestAnimationFrame(gameLoop);              //start animation
}
function gameLoop() {
  ctx.clearRect(canvas.width/-2, canvas.width/2, canvas.width*2, canvas.width*-2);   //clear canvas

  sp = (ts - ots) / 1000;
  ots = ts;                                           // Calculate fps
  fps = Math.round(1 / sp);

  update_movement();
  create_enviroment();
  draw();
  window.requestAnimationFrame(gameLoop);             //repeat and loop for the next frame
}
function create_enviroment() {
 add_axis();
}
function update_movement() {
  for (var i = 0; i < all_objects.length; i++) {
    all_objects[i].y -= 1;                          //gravity
  }
}
function draw() {

  for (var i = 0; i < all_objects.length; i++) {
    all_objects[i].draw();
  }
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
function remove_all() {
  ctx.clearRect(canvas.width/-2, canvas.width/2, canvas.width*2, canvas.width*-2);   //clear canvas
  create_enviroment();
  draw();
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
  reset();
  console.clear();
  error_window("close");
  var elements = document.getElementsByTagName("input")
  if (elements.length != 0) {
    for (var i = 0; i < elements.length; i++) {
        if(elements[i].value != "" || elements[i].value != null) {
            var command = String(elements[i].value);
            if (command.includes("shift") && command.includes("+") && command.includes("X")) {
              var numb = command.match(/\d/g);
              numb = numb.join("");
              console.log("shift X up "+numb);
              elements[i].style.color = "green";
              translate_X(numb,"plus");
            }
            else if (command.includes("shift") && command.includes("-") && command.includes("X")) {
              var numb = command.match(/\d/g);
              numb = numb.join("");
              console.log("shift X down "+numb);
              elements[i].style.color = "green";
              translate_X(numb,"minus");
            }
            else if (command.includes("shift") && command.includes("+") && command.includes("Y")) {
              var numb = command.match(/\d/g);
              numb = numb.join("");
              console.log("shift Y up "+numb);
              elements[i].style.color = "green";
              translate_Y(numb,"plus");
            }
            else if (command.includes("shift") && command.includes("-") && command.includes("Y")) {
              var numb = command.match(/\d/g);
              numb = numb.join("");
              console.log("shift Y down "+numb);
              elements[i].style.color = "green";
              translate_Y(numb,"minus");
            }
            else {
              elements[i].style.color = "red";
              error_window("open","syntax");
              break;
            }
        }
     }
     ctx.clearRect(canvas.width/-2, canvas.width/2, canvas.width*2, canvas.width*-2);   //clear canvas
     create_enviroment();
     draw();
     setTimeout(function(){ check_for_collision(); }, 100);
  }
  else {
    error_window("open","empty");
  }
}
function reset() {
  all_objects[0].x = orig_x;
  all_objects[0].y = orig_y;
  ctx.clearRect(canvas.width/-2, canvas.width/2, canvas.width*2, canvas.width*-2);   //clear canvas
  create_enviroment();
  draw();
}
function reset_list() {
  document.getElementById("MyUl").innerHTML = "";
  count();
  all_objects[0].x = orig_x;
  all_objects[0].y = orig_y;
  ctx.clearRect(canvas.width/-2, canvas.width/2, canvas.width*2, canvas.width*-2);   //clear canvas
  create_enviroment();
  draw();
}
function check_for_collision() {
  const ship_w = all_objects[0].w;
  const ship_h = all_objects[0].h;
  const ship_x = all_objects[0].x;
  const ship_y = all_objects[0].y;

  const station_w = all_objects[1].w;
  const station_h = all_objects[1].h;
  const station_x = all_objects[1].x;
  const station_y = all_objects[1].y;

  if (rectIntersect(station_x, station_y, station_w, station_h, ship_x, ship_y, ship_w, ship_h)) {
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

function translate_X(x, dir) {
  ctx.clearRect(canvas.width/-2, canvas.width/2, canvas.width*2, canvas.width*-2);   //clear canvas
  if (dir == "plus") {
    all_objects[0].x = all_objects[0].x + parseInt(x);
  }
  else if (dir == "minus") {
    all_objects[0].x = all_objects[0].x - parseInt(x);
  }
  create_enviroment();
  draw();
}
function translate_Y(y, dir) {
  ctx.clearRect(canvas.width/-2, canvas.width/2, canvas.width*2, canvas.width*-2);   //clear canvas
  if (dir == "plus") {
    all_objects[0].y = all_objects[0].y - parseInt(y);
  }
  else if (dir == "minus") {
    all_objects[0].y = all_objects[0].y + parseInt(y);
  }
  create_enviroment();
  draw();
}

/*
function reflect_X() {
ctx.clearRect(canvas.width/-2, canvas.width/2, canvas.width*2, canvas.width*-2);   //clear canvas
}
function reflect_Y() {
ctx.clearRect(canvas.width/-2, canvas.width/2, canvas.width*2, canvas.width*-2);   //clear canvas
}
function reflect_XY() {
ctx.clearRect(canvas.width/-2, canvas.width/2, canvas.width*2, canvas.width*-2);   //clear canvas
}
*/
