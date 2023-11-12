import { ctx, num, cellSize } from "./config.js";
export default class SnakeBody {
  constructor({
    label = "tail",
    coor = {
      x: randInt(0, num - 1),
      y: randInt(0, num - 1),
    },
    color = "green",
  }) {
    this.coor = coor;
    this.color = color;
    this.label = label;
    this.prevCoor = { ...this.coor };
  }

  draw() {
    const x = this.coor.x * cellSize;
    const y = this.coor.y * cellSize;

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, cellSize, cellSize);
  }
  update() {
    this.draw();
  }
}
