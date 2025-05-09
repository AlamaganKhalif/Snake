const createGrid = document.querySelector(".grid")
const userScore = document.querySelector(".score")
const width = 20
const cellblock = width * width 
const cells = []
let score = 0


// fuction to create grid 
function createGrid (){
    for (let i = 0; i < cellblock; 1++ ) {
        const cell = document.createElement("div");
        cell.textContent = 1;
      cells.puxh(cell);
      grid.appendChild(cell)
    }
}