let mainDiv = document.querySelector(".game-main");
let size = 4;
let board = Array(size).fill().map(() => Array(size).fill(0));

function createTable() {
    let html = "";
    for (let i = 0; i < size; i++) {
        html += "<div class='row'>";
        for (let j = 0; j < size; j++) {
            html += `<div class='col' id='${i}-${j}'></div>`;
        }
        html += "</div>";
    }
    mainDiv.innerHTML = html;
    addNumber();
    addNumber();
    updateTable();
}

function addNumber() {
    let added = false;
    while (!added) {
        let row = Math.floor(Math.random() * size);
        let col = Math.floor(Math.random() * size);
        if (board[row][col] === 0) {
            board[row][col] = Math.random() < 0.9 ? 2 : 4;
            added = true;
        }
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
        let column = [];
        for (let row = 0; row < size; row++) {
            if (board[row][col] !== 0) {
                column.push(board[row][col]);
            }
        }
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
    if (moved) {
        addNumber();
        updateTable();
    }
}

function moveDown() {
    let moved = false;
    for (let col = 0; col < size; col++) {
        let column = [];
        for (let row = size - 1; row >= 0; row--) {
            if (board[row][col] !== 0) {
                column.push(board[row][col]);
            }
        }
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
        for (let row = size - 1; row >= 0; row--) {
            if (board[row][col] !== column[size - 1 - row]) {
                moved = true;
            }
            board[row][col] = column[size - 1 - row];
        }
    }
    if (moved) {
        addNumber();
        updateTable();
    }
}

function moveLeft() {
    let moved = false;
    for (let row = 0; row < size; row++) {
        let newRow = board[row].filter(val => val !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow.splice(i + 1, 1);
                moved = true;
            }
        }
        while (newRow.length < size) {
            newRow.push(0);
        }
        if (newRow.join(',') !== board[row].join(',')) {
            moved = true;
        }
        board[row] = newRow;
    }
    if (moved) {
        addNumber();
        updateTable();
    }
}

function moveRight() {
    let moved = false;
    for (let row = 0; row < size; row++) {
        let newRow = board[row].filter(val => val !== 0);
        for (let i = newRow.length - 1; i > 0; i--) {
            if (newRow[i] === newRow[i - 1]) {
                newRow[i] *= 2;
                newRow.splice(i - 1, 1);
                moved = true;
            }
        }
        while (newRow.length < size) {
            newRow.unshift(0);
        }
        if (newRow.join(',') !== board[row].join(',')) {
            moved = true;
        }
        board[row] = newRow;
    }
    if (moved) {
        addNumber();
        updateTable();
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") moveUp();
    else if (e.key === "ArrowDown") moveDown();
    else if (e.key === "ArrowLeft") moveLeft();
    else if (e.key === "ArrowRight") moveRight();
});

createTable();