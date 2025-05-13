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
let snake = [];
let direction = 1;
let nextDirection = direction;
let appleIndex = 0;
let gameInterval;

const keyState = {};

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
  clearInterval(gameInterval); 
  Object.keys(keyState).forEach(k => keyState[k] = false); 
  clearGrid();

  snake = [0];
  direction = 1;
  nextDirection = direction;
  score = 0;
  isPaused = false;
  gameStarted = true;

  gameOverMessage.style.display = "none";
  userScore.textContent = `Score: ${score}`;
  bestScoreDisplay.textContent = `Best Score: ${bestScore}`;
  statusDisplay.textContent = "";

  generateApple();
  snake.forEach(i => cells[i].classList.add("snake"));

  setTimeout(() => {
    gameInterval = setInterval(move, 100);
  }, 100);
}

function move() {
  const head = snake[0];
  const newHead = head + nextDirection;

  const hitWall =
    (nextDirection === 1 && head % width === width - 1) ||
    (nextDirection === -1 && head % width === 0) ||
    (nextDirection === width && head >= cellblock - width) ||
    (nextDirection === -width && head < width);

  const hitSelf = snake.includes(newHead);

  if (hitWall || hitSelf) {
    gameOver();
    return;
  }

  direction = nextDirection;

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
  isPaused = false;
  Object.keys(keyState).forEach(k => keyState[k] = false); // Clear key state

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

function clearGrid() {
  cells.forEach(cell => {
    cell.classList.remove("snake");
    cell.classList.remove("apple");
  });
}

function control(e) {
  if (!gameStarted) return;

  if (e.type === 'keydown' && keyState[e.key]) return;
  keyState[e.key] = e.type === 'keydown';

  if (e.key === " " && e.type === 'keydown') {
    if (isPaused) {
      gameInterval = setInterval(move, 100);
      statusDisplay.textContent = "";
      isPaused = false;
    } else {
      clearInterval(gameInterval);
      statusDisplay.textContent = "Paused";
      isPaused = true;
    }
    return;
  }

  if (!isPaused && e.type === 'keydown') {
    if (e.key === "ArrowRight" && direction !== -1) nextDirection = 1;
    else if (e.key === "ArrowLeft" && direction !== 1) nextDirection = -1;
    else if (e.key === "ArrowUp" && direction !== width) nextDirection = -width;
    else if (e.key === "ArrowDown" && direction !== -width) nextDirection = width;
  }
}

document.addEventListener("keydown", control);
document.addEventListener("keyup", control);

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

createGrid();
bestScoreDisplay.textContent = `Best Score: ${bestScore}`;




