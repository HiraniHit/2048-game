let mainDiv = document.querySelector(".game-main");
let size = 4;
let score = 0
let board = Array(size)
    .fill()
    .map(() => Array(size).fill(0));


document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
           moveUp();
        } else if (e.key === "ArrowDown") {
            moveDown();
        } else if (e.key === "ArrowLeft") {
            moveLeft();
        } else if (e.key === "ArrowRight") {
            moveRight();
        }
     
});


function createTable() {
    let row = "";
    for (let i = 0; i < size; i++) {
        row += `<div class="row">`;
        for (let j = 0; j < size; j++) {
            row += `<div class="col" id='${i}-${j}'></div>`;
        }
        row += `</div>`;
    }
    mainDiv.innerHTML = row;

    addNumber();
    addNumber();
    updateTable()
}

createTable();
function addNumber() {
    const maxAttempts = 13;
    let attempts = 0;

    while (attempts < maxAttempts) {
        let rowNum = Math.floor(Math.random() * size);
        let colNum = Math.floor(Math.random() * size);

        let div = document.getElementById(`${rowNum}-${colNum}`);
        if (div && div.textContent === "") {
            let newValue = Math.random() < 0.8 ? 2 : 4;
            div.textContent = newValue;
            board[rowNum][colNum] = newValue;
            return;
        }
        attempts++;
    }
}
function updateTable() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let cell = document.getElementById(`${i}-${j}`);
            cell.textContent = board[i][j] || "";
        }
    }
}
function moveUp() {
    let moved = false;
    for (let col = 0; col < size; col++) {
        let column = board.map(row => row[col]).filter(val => val !== 0);
        for (let i = 0; i < column.length - 1; i++) {
            if (column[i] === column[i + 1]) {
                column[i] *= 2;
                column.splice(i + 1, 1);
                moved = true;
            }
        }
        while (column.length < size) {
            column.push(0);
        }
        for (let row = 0; row < size; row++) {
            if (board[row][col] !== column[row]) {
                moved = true;
            }
            board[row][col] = column[row];
        }
    }
    addNumber();
        updateTable();
        return moved;
}

function moveDown() {

    for (let col = 0; col < size; col++) {
        let column = board.map(row => row[col]).filter(val => val !== 0);
        for (let i = column.length - 1; i > 0; i--) {
            if (column[i] === column[i - 1]) {
                column[i] *= 2;
                column.splice(i - 1, 1);
            }
        }
        while (column.length < size) {
            column.unshift(0);
        }
        for (let row = 0; row < size; row++) {
            if (board[row][col] !== column[row]) {
                
            }
            board[row][col] = column[row];
        }
    }
    addNumber();
    updateTable();
    
}

function moveLeft() {
    
    for (let row = 0; row < size; row++) {
        let newRow = board[row].filter(val => val !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow.splice(i + 1, 1);
            }
        }
        while (newRow.length < size) {
            newRow.push(0);
        }
        board[row] = newRow;
    }
    addNumber();
    updateTable();
    
    
}

function moveRight() {
    
    for (let row = 0; row < size; row++) {
        let newRow = board[row].filter(val => val !== 0);
        for (let i = newRow.length - 1; i > 0; i--) {
            if (newRow[i] === newRow[i - 1]) {
                newRow[i] *= 2;
                newRow.splice(i - 1, 1);
                
            }
        }
        while (newRow.length < size) {
            newRow.unshift(0);
        }
        board[row] = newRow;
    }
    addNumber();
    updateTable();
    
}


