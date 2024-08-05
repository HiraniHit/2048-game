let mainDiv = document.querySelector(".game-main");
let loading = document.querySelector(".loading-page");
let game = document.querySelector(".game");
let result = document.querySelector(".result");
let scoreDiv = document.querySelector(".score");
let bestScoreDiv = document.querySelector(".bestScore");
let score = 0;
let bestScore = JSON.parse(localStorage.getItem("best-score"));
let size = 4;
let board = Array(size)
    .fill()
    .map(() => Array(size).fill(0));
let up = true;
let down = true;
let right = true;
let left = true;

setTimeout(() => {
    loading.classList.add("hide");
    game.classList.remove("hide");
}, 2000);

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
function cellColor(cell) {
    if (cell.textContent == "") {
        cell.style.backgroundColor = "#92a8c2";
        cell.style.color = "black";
    }
    if (cell.textContent == 2) {
        cell.style.backgroundColor = "#f5f5f5";
        cell.style.color = "black";
    }
    if (cell.textContent == 4) {
        cell.style.backgroundColor = "#cccaca";
        cell.style.color = "black";
    }
    if (cell.textContent == 8) {
        cell.style.backgroundColor = "#e3beed";
        cell.style.color = "white";
    }
    if (cell.textContent == 16) {
        cell.style.backgroundColor = "#da93ed";
        cell.style.color = "white";
    }
    if (cell.textContent == 32) {
        cell.style.backgroundColor = "#b157c9";
        cell.style.color = "white";
    }
    if (cell.textContent == 64) {
        cell.style.backgroundColor = "#52073c";
        cell.style.color = "white";
    }
    if (cell.textContent == 128) {
        cell.style.backgroundColor = "#2b1673";
        cell.style.color = "white";
    }
    if (cell.textContent == 256) {
        cell.style.backgroundColor = "#084547";
        cell.style.color = "white";
    }
    if (cell.textContent == 512) {
        cell.style.backgroundColor = "#84a0c2";
        cell.style.color = "black";
    }
    if (cell.textContent == 1024) {
        cell.style.backgroundColor = "#84a0c2";
        cell.style.color = "black";
    }
    if (cell.textContent == 2048) {
        cell.style.backgroundColor = "#84a0c2";
        cell.style.color = "black";
    }
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
            cellColor(cell);
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
                score += column[i];
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
    up = moved;
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
                score += column[i];

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
    down = moved;
}

function moveLeft() {
    let moved = false;
    for (let row = 0; row < size; row++) {
        let newRow = board[row].filter((val) => val !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                score += newRow[i];
                newRow.splice(i + 1, 1);
                moved = true;
            }
        }
        while (newRow.length < size) {
            newRow.push(0);
        }
        if (newRow.join(",") !== board[row].join(",")) {
            moved = true;
        }
        board[row] = newRow;
    }
    if (moved) {
        addNumber();
        updateTable();
    }
    left = moved;
}

function moveRight() {
    let moved = false;
    for (let row = 0; row < size; row++) {
        let newRow = board[row].filter((val) => val !== 0);
        for (let i = newRow.length - 1; i > 0; i--) {
            if (newRow[i] === newRow[i - 1]) {
                newRow[i] *= 2;
                score += newRow[i];

                newRow.splice(i - 1, 1);
                moved = true;
            }
        }
        while (newRow.length < size) {
            newRow.unshift(0);
        }
        if (newRow.join(",") !== board[row].join(",")) {
            moved = true;
        }
        board[row] = newRow;
    }
    if (moved) {
        addNumber();
        updateTable();
    }
    right = moved;
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") moveUp();
    else if (e.key === "ArrowDown") moveDown();
    else if (e.key === "ArrowLeft") moveLeft();
    else if (e.key === "ArrowRight") moveRight();

    scoreDiv.textContent = score;

    if (score > bestScore) {
        bestScoreDiv.textContent = score;
    } else {
        bestScoreDiv.textContent = bestScore;
    }
    if (up == false && down == false && left == false && right == false) {
        if (bestScore < score) {
            bestScore = score;
        }

        localStorage.setItem("best-score", JSON.stringify(bestScore));
        mainDiv.classList.add("hide");
        result.classList.remove("hide");
    }
});

function startNewGame() {
    window.location.reload();
}
function playAgain() {
    window.location.reload();
}
createTable();
