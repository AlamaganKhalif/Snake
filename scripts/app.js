const createGrid = document.querySelector(".grid")
const userScore = document.querySelector(".score")
const width = 20
const cellblock = width * width 
const cells = []
let score = 0
let snake = [0]


// fuction to create grid 
function createGrid (){
    for (let i = 0; i < cellblock; 1++ ) {
        const cell = document.createElement("div");
        cell.textContent = 1;
      cells.puxh(cell);
      grid.appendChild(cell)
    }
}


function beginGame() {
snake.forEach(index => cells[index].classList.remove("snake"))
cells[appleIndex].classList.remove("apple")


scoreDisplay.textContent = score;
statusDisplay.textContent = "";

snake.forEach(index => cells[index].classList.add("snake"))
}



function move(){
    const head = snake[0]
    
    // check for collson 
    if(
        (direction === 1 && head % width === width -1) ||
        (direction === -1 && head % width === 0) ||
        (direction === width && head + width >= cells.length) ||
        (direction === -width && head - width < 0)
    ) {

        statusDisplay.textContent = "Game Over";
        return;
    }
}

const tail = snake.pop()