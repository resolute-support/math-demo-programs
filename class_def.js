class Station {
  constructor(x,y,w,h) {
    this.y = y;
    this.x = x;
    this.w = w;
    this.h = h;
  }
  draw() {
    ctx.save();
    ctx.scale(1, -1);
    ctx.drawImage(station_img, this.x, this.y*-1, this.w, this.h);
    ctx.restore();
  }
}
class Ship {
  constructor(x,y,w,h) {
    this.y = y;
    this.x = x;
    this.w = w;
    this.h = h;
  }
  draw() {
    ctx.save();
    ctx.scale(1, -1);
    ctx.drawImage(ship_img, this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}
