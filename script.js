var canvas = document.querySelector("canvas");
var crt = canvas.getContext("2d");
console.log(crt);
var scale = 20;
var rows = canvas.height / scale;
var columns = canvas.width / scale;

let snake = [];
snake[0] = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};
var food = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};
let d = "right";
document.onkeydown = dirction;
function dirction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "right") {
    d = "left";
  } else if (key == 38 && d != "down") {
    d = "up";
  } else if (key == 39 && d != "left") {
    d = "right";
  } else if (key == 40 && d != "up") {
    d = "down";
  }
}
let playgame = setInterval(draw, 100);
function draw() {
  crt.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    crt.fillStyle = "white";
    crt.strokeStyle = "red";
    crt.fillRect(snake[i].x, snake[i].y, scale, scale);
    crt.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }
  crt.fillStyle = "white";
  crt.strokeStyle = "green";
  crt.fillRect(food.x, food.y, scale, scale);
  crt.strokeRect(food.x, food.y, scale, scale);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "left") snakeX -= scale;
  if (d == "up") snakeY -= scale;
  if (d == "right") snakeX += scale;
  if (d == "down") snakeY += scale;

  if (snakeX > canvas.width) {
    snakeX = 0;
  }
  if (snakeY > canvas.height) {
    snakeY = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width;
  }
  if (snakeY < 0) {
    snakeY = canvas.height;
  }

  if (snakeX == food.x && snakeY == food.y) {
    food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * columns) * scale,
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  if (eatSelf(newHead, snake)) {
    clearInterval(playgame);
  }

  snake.unshift(newHead);
}

function eatSelf(head, arry) {
  for (let i = 0; i < arry.length; i++) {
    if (head.x == arry[i].x && head.y == arry[i].y) {
      return true;
    }
  }
  return false;
}
