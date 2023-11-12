import { ctx, num, cellSize } from "./config.js";
import { randInt } from "./math.js";

export class Food {
  constructor({
    label = "apple",
    coor = {
      x: randInt(0, num - 1),
      y: randInt(0, num - 1),
    },
    color = "blue",
  }) {
    this.coor = coor;
    this.color = color;
    this.label = label;
    this.image = new Image();
    this.image.src =
      "https://cdn.iconscout.com/icon/free/png-256/free-apple-fruit-food-vitamin-healthy-31182.png";
  }

  draw() {
    const x = this.coor.x * cellSize;
    const y = this.coor.y * cellSize;

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.drawImage(this.image, x, y, cellSize, cellSize);
  }

  update() {
    this.draw();
  }
}
