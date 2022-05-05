function getRandomCoords() {
  let num = Math.random() * 40;
  return Math.round(num);
}


let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

let score = 0;
let blockSize = 10;
//               🠙 1 (up)
//  (left) 4 🠘    🠚 2 (right)  default
//             🠛 3 (down)
let direction = 2;

let applePosition = [Math.floor(getRandomCoords()/2), getRandomCoords()];

let snakeBody = [
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
]

document.addEventListener("keydown", function(e) {
  // if key is arrow right
  if (e.keyCode == "39" && direction !== 4) {
      direction = 2; 
  }
  // if key is arrow down
  if (e.keyCode == "40" && direction !== 1) {
      direction = 3; 
  }
  // if key is arrow left
  if (e.keyCode == "37" && direction !== 2) {
      direction = 4; 
  }
  // if key is arrow up
  if (e.keyCode == "38" && direction !== 3) {
      direction = 1; 
  }
})

play = setInterval(function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  if (direction == 1) {
    snakeBody.unshift([snakeBody[0][0], --snakeBody[0][1]]);
  }  else if (direction == 2) {
      snakeBody.unshift([++snakeBody[0][0], snakeBody[0][1]]);
  } else if (direction == 3) {
      snakeBody.unshift([snakeBody[0][0], ++snakeBody[0][1]]);
  } else if (direction == 4) {
      snakeBody.unshift([--snakeBody[0][0], snakeBody[0][1]]);
  }
  snakeBody.pop();

  for (let i = 0; i < snakeBody.length; ++i) {
    context.fillStyle = "green";
    context.fillRect(snakeBody[i][0] * blockSize, snakeBody[i][1] * blockSize, 10, 10);
  }

  // Рисуем яблоко
  context.fillStyle = "red";
  context.fillRect(applePosition[0] * blockSize, applePosition[1] * blockSize, 10, 10);
  
  if (snakeBody[0][0] == applePosition[0] && snakeBody[0][1] == applePosition[1]) {
    snakeBody.push(snakeBody[snakeBody.length - 1]);
    applePosition[0] = Math.floor(getRandomCoords()/2);
    applePosition[1] = getRandomCoords();
    score++;
}
 
  // Завершение игры
  if (snakeBody[0][0] * 10 > 199 || snakeBody[0][1] * 10 > 399 || snakeBody[0][0] * 10 < 0 || snakeBody[0][1] * 10 < 0) {
      clearInterval(play);
      alert("Ваш счёт: " + score);
  }

}, 250)