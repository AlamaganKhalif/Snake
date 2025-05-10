const grid = document.querySelector(".grid")
const userScore = document.querySelector(".score")
const statusDisplay = document.querySelector(".status")
const width = 10
const cellblock = width * width 
const cells = []
let score = 0
let snake = [0]
let direction = 1;
let appleIndex = 0
let gameInterval;


// fuction to create grid 
function createGrid (){
    for (let i = 0; i < cellblock; i++ ) {
        const cell = document.createElement("div");
        cell.textContent = i;
      cells.push(cell);
      grid.appendChild(cell)
    }
}


function StartGame() {
snake.forEach(index => cells[index].classList.remove("snake"))
cells[appleIndex].classList.remove("apple")
clearInterval(gameInterval)



userScore.textContent = score
statusDisplay.textContent = "";

snake.forEach(index => cells[index].classList.add("snake"))

generateApple()
gameInterval = setInterval(move, 200)

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
        appleIndex = Math.floor(Math.random() * cellsblock);
    } while (cells[appleIndex].classList.contains("snake"))
        cells[appleIndex].classList.add("apple")
}



function control(move) {
    if (move.key === "ArrowRight" && direction !== -1) direction = 1;
    else if (move.key === "ArrowUp" && direction !== width) direction = - width
    else if (move.key === "ArrowLeft" && direction !== 1) direction = - 1
    else if (move.key === "ArrowDown" && direction !== -width) direction =  width

}

document.addEventListener("keydown", control)
createGrid()
StartGame()