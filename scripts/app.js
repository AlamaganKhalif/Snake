const grid = document.querySelector(".grid")
const userScore = document.querySelector(".score")
const bestScoreDisplay = document.querySelector(".best-score")
const statusDisplay = document.querySelector(".status")
const countdownDisplay = document.querySelector(".countdown")

const width = 10
const cellblock = width * width 
const cells = []
let score = 0
let bestScore = localStorage.getItem("best-score") || 0
let gameStarted = false
let isPaused = false
let snake = [0]
let direction = 1;
let appleIndex = 0
let gameInterval;


// fuction to create grid 
function createGrid (){
    for (let i = 0; i < cellblock; i++ ) {
        const cell = document.createElement("div");
        // cell.textContent = i;
      cells.push(cell);
      grid.appendChild(cell)
    }
}


function countdown(callback) {
    let count = 3
    countdownDisplay.textContent = count
    
    const interval = setInterval(() => {
    count--
    if (count > 0) {
        countdownDisplay.textContent = count
    } else {
        clearInterval(interval)
        countdownDisplay.textContent = ""
        callback()
    }
    }, 1000)
}





function startGame() {
snake.forEach(index => cells[index].classList.remove("snake", "apple"))
cells[appleIndex].classList.remove("apple")
clearInterval(gameInterval)

snake = [0]
direction = 1
score = 0;
isPaused = false

userScore.textContent = score
bestScoreDisplay.textContent = bestScore
statusDisplay.textContent = "";

generateApple()
snake.forEach(index => cells[index].classList.add("snake"))

gameInterval = setInterval(move, 150)
gameStarted = true
}


function move(){
    const head = snake[0]
    if (
        (direction === 1 && head % width === width - 1) || // right wall
        (direction === -1 && head % width === 0) || // left wall
        (direction === width && head + width >= cellblock) || // bottom
        (direction === -width && head < width) || // top
        cells[head + direction].classList.contains("snake") // self
    ) {
        statusDisplay.textContent = "Game Over"
        clearInterval(gameInterval)
        gameStarted = false

        if (score > bestScore) {
            bestScore = score
            localStorage.setItem("best-score", bestScore)
            bestScoreDisplay.textContent = bestScore
        }
        return
    }    
   const tail = snake.pop()
   cells[tail].classList.remove("snake")

   const newHead = head + direction
   snake.unshift(newHead)


   if (newHead === appleIndex){
    cells[appleIndex].classList.remove("apple")
    snake.push(tail);
    score++
    userScore.textContent = score
    generateApple()
   
   
    if (snake.length === cellblock) {
        statusDisplay.textContent = "You Win"
        clearInterval(gameInterval)
        return
    }}
 cells[newHead].classList.add("snake")
}



function generateApple(){
    do {
        appleIndex = Math.floor(Math.random() * cellblock);
    } while (cells[appleIndex].classList.contains("snake"))
        cells[appleIndex].classList.add("apple")
}



function control(listen) {
    if (!gameStarted) 
        return
    if (listen.key === " ") {
        if (isPaused){
            gameInterval = setInterval(move, 150)
            statusDisplay.textContent = ""
        } else{
            clearInterval(gameInterval)
            statusDisplay.textContent = "paused"
        }
        isPaused = !isPaused
        return;
    }
    if (!isPaused){
    if (listen.key === "ArrowRight" && direction !== -1) direction = 1;
    else if (listen.key === "ArrowUp" && direction !== width) direction = - width
    else if (listen.key === "ArrowLeft" && direction !== 1) direction = - 1
    else if (listen.key === "ArrowDown" && direction !== -width) direction =  width
    }
}

document.getElementById("startBtn").addEventListener("click", () => {
    if (!gameStarted) {
        countdown(startGame)
    }
} )


grid.addEventListener("click", () => {
    if(!gameStarted) {
        countdown(startGame)
    }
})

document.addEventListener("keydown", control)

createGrid()
bestScoreDisplay.textContent = bestScore