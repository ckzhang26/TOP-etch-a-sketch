
const grid = document.querySelector('#grid-container');
const createBtn = document.querySelector('#create');
const resetBtn = document.querySelector('#reset');
createBtn.addEventListener('click', createGrid);
resetBtn.addEventListener('click', resetGrid);

function createGrid() {
    // number of rows and columns
    const number = document.querySelector('#grid-number').value;
    if (number > 100 || number < 1) return alert('Please enter a number between 1 and 100');

    while(grid.firstChild) grid.removeChild(grid.firstChild);

    // get grid width, height from offsetWidth and offsetHeight properties
    const [ gridWidth, gridHeight ] = [ grid.offsetWidth, grid.offsetHeight ];
    grid.style.gridTemplateColumns = `repeat(${number}, ${gridWidth/number}px)`;
    grid.style.gridTemplateRows = `repeat(${number}, ${gridHeight/number}px)`;
    
    for (let i = 0; i < number ** 2; i++) {
        const cell = document.createElement('div');
        cell.style.width = `${gridWidth/number}px`;
        cell.style.height = `${gridHeight/number}px`;
        cell.classList.add('cell');
        cell.addEventListener('mouseover', fillSquare);
        grid.appendChild(cell);
    }
}

function resetGrid() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.background = 'white';
    }
}


// Object to keep track of grid options
const gridState = {
    color : 'black',
    isPressed : false,
}


// Grid square color
const colorBtns = document.querySelectorAll('.color-button');
colorBtns.forEach(colorBtn => colorBtn.addEventListener('click', selectColor));

function selectColor(event) {
    colorBtns.forEach(colorBtn => colorBtn.classList.remove('color-button-selected'));
    event.target.classList.add('color-button-selected');

    const colorDisplay = document.querySelector('.color-display');
    if (event.target.dataset.color !== 'rainbow') {
        colorDisplay.style.background = event.target.dataset.color;
    }  else {
        colorDisplay.style.background = 'linear-gradient(135deg, red, orange, yellow,       green, blue, indigo, violet)';
    }
    gridState.color = event.target.dataset.color;
}


// Filling Squares
// Squares will be filled on mouseover and D key is pressed down
document.onkeydown = function(event) {
    if (event.code === 'KeyD') gridState.isPressed = true;
}

document.onkeyup = function(event) {
    if (event.code === 'KeyD') gridState.isPressed = false;
}

function fillSquare(event) {
    if (gridState.isPressed) {
        if (gridState.color === 'rainbow') {
            const randomR = Math.floor( Math.random() * 257 );
            const randomG = Math.floor( Math.random() * 257 );
            const randomB = Math.floor( Math.random() * 257 );
            event.target.style.background = `rgb(${randomR}, ${randomG}, ${randomB})`;
        } else {
            event.target.style.background = gridState.color;
        }
    }
}



// create 16x16 grid on page load
window.onload = function() {
    document.querySelector('#grid-number').value = 16;
    createGrid();
}