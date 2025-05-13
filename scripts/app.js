const grid = document.querySelector(".grid");
const titleOverGrid = document.querySelector(".overgrid-title");
const userScore = document.querySelector(".score");
const bestScoreDisplay = document.querySelector(".best-score");
const gameOverMessage = document.querySelector(".game-over-message");
const statusDisplay = document.querySelector(".status");
const countdownDisplay = document.querySelector(".countdown");
const startButton = document.getElementById("startBtn");

const width = 28;
const cellblock = width * width;
const cells = [];

let score = 0;
let bestScore = localStorage.getItem("best-score") || 0;
let gameStarted = false;
let isPaused = false;
let snake = [3];
let direction = 1;
let appleIndex = 0;
let gameInterval;

function createGrid() {
  for (let i = 0; i < cellblock; i++) {
    const cell = document.createElement("div");
    cells.push(cell);
    grid.appendChild(cell);
  }
}

function countdown(callback) {
  let count = 3;
  countdownDisplay.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownDisplay.textContent = count;
    } else {
      clearInterval(interval);
      countdownDisplay.textContent = "";
      callback();
    }
  }, 1000);
}

function startGame() {
  snake.forEach(i => cells[i].classList.remove("snake"));
  cells[appleIndex]?.classList.remove("apple");
  clearInterval(gameInterval);

  snake = [3];
  direction = 1;
  score = 0;
  isPaused = false;
  gameStarted = true;

  gameOverMessage.style.display = "none";
  userScore.textContent = `Score: ${score}`;
  bestScoreDisplay.textContent = `Best Score: ${bestScore}`;

  generateApple();
  snake.forEach(i => cells[i].classList.add("snake"));

  gameInterval = setInterval(move, 100);
}

function move() {
  const head = snake[0];
  const newHead = head + direction;

  const hitWall = 
    (direction === 1 && head % width === width - 1) || 
    (direction === -1 && head % width === 0) || 
    (direction === width && head >= cellblock - width) || 
    (direction === -width && head < width);

  const hitSelf = snake.includes(newHead);

  if (hitWall || hitSelf) {
    gameOver();
    return;
  }

  snake.unshift(newHead);

  if (newHead === appleIndex) {
    cells[appleIndex].classList.remove("apple");
    score++;
    userScore.textContent = `Score: ${score}`;
    generateApple();
  } else {
    const tail = snake.pop();
    cells[tail].classList.remove("snake");
  }

  cells[newHead].classList.add("snake");

  if (snake.length === cellblock) {
    statusDisplay.textContent = "You Win!";
    clearInterval(gameInterval);
  }
}

function gameOver() {
  gameOverMessage.textContent = "Game Over";
  gameOverMessage.style.display = "block";
  clearInterval(gameInterval);
  gameStarted = false;

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("best-score", bestScore);
    bestScoreDisplay.textContent = `Best Score: ${bestScore}`;
  }
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * cellblock);
  } while (cells[appleIndex].classList.contains("snake"));
  cells[appleIndex].classList.add("apple");
}

function control(e) {
  if (!gameStarted) return;

  if (e.key === " ") {
    if (isPaused) {
      gameInterval = setInterval(move, 100);
      statusDisplay.textContent = "";
    } else {
      clearInterval(gameInterval);
      statusDisplay.textContent = "Paused";
    }
    isPaused = !isPaused;
    return;
  }

  if (!isPaused) {
    if (e.key === "ArrowRight" && direction !== -1) direction = 1;
    else if (e.key === "ArrowLeft" && direction !== 1) direction = -1;
    else if (e.key === "ArrowUp" && direction !== width) direction = -width;
    else if (e.key === "ArrowDown" && direction !== -width) direction = width;
  }
}


startButton.addEventListener("click", () => {
  if (!gameStarted) {
    titleOverGrid.style.display = "none";
    startButton.style.display = "none";
    countdown(startGame);
  }
});

grid.addEventListener("click", () => {
  if (!gameStarted) {
    titleOverGrid.style.display = "none";
    startButton.style.display = "none";
    countdown(startGame);
  }
});

document.addEventListener("keydown", control);

createGrid();
bestScoreDisplay.textContent = `Best Score: ${bestScore}`;




