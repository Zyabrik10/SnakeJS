import { canvas, ctx, num, cellSize, snake } from "./config.js";
import { Food } from "./Food.js";
import SnakeBody from "./SnakeBody.js";
import { randInt } from "./math.js";

const startButton = document.querySelector(".game-start-button");
const bg = document.querySelector(".start-game-bg");
let game;

startButton.addEventListener("click", () => {
  bg.style.display = "none";
  console.log(bg);

  setTimeout(() => {
    game = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      food.update();
      updateSnake();
    }, 100);
  }, 200);
});

let score = 0;

const scoreText = document.querySelector(".score");
scoreText.innerHTML = `Score: ${score}`;

const head = new SnakeBody({
  color: "red",
  coor: {
    x: (Math.floor(canvas.width / 2) * num) / canvas.width,
    y: (Math.floor(canvas.height / 2) * num) / canvas.height,
  },
  label: "head",
});

snake.push(head);
let food = new Food({});

let dir = randInt(1, 4);

function checkFoodCollision(head) {
  if (food.coor.x === head.coor.x && food.coor.y === head.coor.y) {
    score += 1;
    scoreText.innerHTML = `Score: ${score}`;

    food.coor = {
      x: randInt(0, num - 1),
      y: randInt(0, num - 1),
    };

    const newTail = new SnakeBody({
      label: "tail",
      coor: {
        x: snake[snake.length === 1 ? 0 : snake.length - 1].prevCoor.x,
        y: snake[snake.length === 1 ? 0 : snake.length - 1].prevCoor.y,
      },
      color: "green",
    });

    snake.push(newTail);
  }
}

function checkBodyCollision(head) {
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) continue;

    const tail = snake[i];

    if (head.coor.x === tail.coor.x && head.coor.y === tail.coor.y) {
      clearInterval(game);
      alert("Game Over");

      setTimeout(() => {
        window.location.reload();
      }, 400);
    }
  }
}

function updateSnake() {
  for (let i = 0; i < snake.length; i++) {
    snake[i].update();
    snake[i].prevCoor = { ...snake[i].coor };

    if (snake[i].label === "head") {
      if (snake[i].coor.x < 0) {
        snake[i].coor.x = num;
      } else if (snake[i].coor.x > num) {
        snake[i].coor.x = -1;
      }

      if (snake[i].coor.y * cellSize < 0) {
        snake[i].coor.y = num;
      } else if (snake[i].coor.y > num) {
        snake[i].coor.y = -1;
      }

      switch (dir) {
        case 1:
          snake[i].coor.y -= 1;
          break;
        case 2:
          snake[i].coor.x += 1;
          break;
        case 3:
          snake[i].coor.y += 1;
          break;
        case 4:
          snake[i].coor.x -= 1;
      }

      checkFoodCollision(snake[i]);
      checkBodyCollision(snake[i]);
      continue;
    }

    snake[i].coor = { ...snake[i - 1].prevCoor };
  }
}

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowUp":
      if (
        snake.length > 1 &&
        snake[0].coor.x === snake[1].coor.x &&
        snake[0].coor.y - 1 === snake[1].coor.y
      ) {
        return;
      }
      dir = 1;
      break;
    case "ArrowRight":
      if (
        snake.length > 1 &&
        snake[0].coor.x + 1 === snake[1].coor.x &&
        snake[0].coor.y === snake[1].coor.y
      ) {
        return;
      }
      dir = 2;
      break;
    case "ArrowDown":
      if (
        snake.length > 1 &&
        snake[0].coor.x === snake[1].coor.x &&
        snake[0].coor.y + 1 === snake[1].coor.y
      ) {
        return;
      }
      dir = 3;
      break;
    case "ArrowLeft":
      if (
        snake.length > 1 &&
        snake[0].coor.x - 1 === snake[1].coor.x &&
        snake[0].coor.y === snake[1].coor.y
      ) {
        return;
      }
      dir = 4;
  }
});
