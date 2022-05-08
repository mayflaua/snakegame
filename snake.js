function getRandomCoord(max) {
  // returns random coordinate from 0 to max
  let num = Math.random() * max;
  return Math.floor(num);
}

const speed = 4;  // moves per second
const untouchableScore = 1; // minimum score to self-touch end game // 0 sets instant death(bug)
const startLenght = 4; // starting snake body lenght

const appleColor = "rgb(67, 217, 173)";


let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

let score = 0;
let blockSize = 10;
//               🠙 1 (up) default
//  (left) 4 🠘    🠚 2 (right)  
//             🠛 3 (down)
let direction = 1;

let width = canvas.width/blockSize;
let height = canvas.height/blockSize;

let applePosition = [getRandomCoord(width), getRandomCoord(height)];

let snakeBody = []
// centering start position of snake
for (let i = 0; i < startLenght; i++) {
  snakeBody.push([Math.floor(width/2), Math.floor(height/2+1)]);
}


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

game = function() {

    // make everything shine
    context.shadowColor=appleColor;
    context.shadowBlur=10;

    // clearing game field
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(1, 22, 39, 0.84)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // snake behaviour
    // direction
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

    // rendering

    
    for (let i = 0; i < snakeBody.length; ++i) {
      // imitating fade-out of snake from head to tail
      // // // // why is this four-block snake has only 3 blocks visible>? am i so bad in math?
      currAlpha = 1 - i * (1 / (snakeBody.length));
      context.fillStyle = "rgba(67, 217, 173, " + currAlpha + ")";

      // making a round head depending on direction
      if (i == 0) {
        // only first block really needs in head rounding
        context.beginPath();
        if (direction == 1) {
          context.arc(snakeBody[0][0]*10+5, snakeBody[0][1]*10, 5, 0, 2 * Math.PI, false);
          context.fillRect(snakeBody[0][0] * blockSize, snakeBody[0][1] * blockSize, 10, 10);
        }
        else if (direction == 2) {
          context.arc(snakeBody[0][0]*10+10, snakeBody[0][1]*10+5, 5, 0, 2 * Math.PI, false);
          context.fillRect(snakeBody[0][0] * blockSize, snakeBody[0][1] * blockSize, 10, 10);
        }
        else if (direction == 3) {
          context.arc(snakeBody[0][0]*10+5, snakeBody[0][1]*10+10, 5, 0, 2 * Math.PI, false);
          context.fillRect(snakeBody[0][0] * blockSize, snakeBody[0][1] * blockSize, 10, 10);
        }
        else if (direction == 4) {
          context.arc(snakeBody[0][0]*10, snakeBody[0][1]*10+5, 5, 0, 2 * Math.PI, false);
          context.fillRect(snakeBody[0][0] * blockSize, snakeBody[0][1] * blockSize, 10, 10);
        }
        context.fill();
      }
      else {
        // non-head blocks
        context.fillRect(snakeBody[i][0] * blockSize, snakeBody[i][1] * blockSize, 10, 10);
      }
  }
  
    
   
    // end game conditions
    // snake get out of field
    if (snakeBody[0][0] * 10 > canvas.width-1 || snakeBody[0][1] * 10 > canvas.height-1 || snakeBody[0][0] * 10 < 0 || snakeBody[0][1] * 10 < 0) {
        clearInterval(run);
        alert("Score: " + score + '\nerr: out of field');
    }
    // snake touches itself
    snakeBody.forEach(function(e, i) {
      let lastBlock = snakeBody.length - 1;
      if (e[0] == snakeBody[lastBlock][0] && e[1] == snakeBody[lastBlock][1] && i < lastBlock && score >= untouchableScore) {
        clearInterval(run);
        alert("Score: " + score + '\nerr: self-touch');
      } 
    })

    // apple spawn
    
    // context.fillStyle = appleColor;
    // context.fillRect(applePosition[0] * blockSize, applePosition[1] * blockSize, 10, 10);
    context.beginPath();
    context.arc(applePosition[0]*10+5, applePosition[1]*10+5, 5, 0, 2 * Math.PI, false);
    context.fillStyle = appleColor;
    context.fill();



    // new apple if it was picked 
    if (snakeBody[0][0] == applePosition[0] && snakeBody[0][1] == applePosition[1]) {
      snakeBody.push(snakeBody[snakeBody.length - 1]);
      applePosition[0] = getRandomCoord(width);
      applePosition[1] = getRandomCoord(height);
      score++;
    };
}

run = setInterval(game, 1000/speed+score);