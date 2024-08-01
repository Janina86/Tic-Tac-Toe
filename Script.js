let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function initializeGame() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    for (let i = 0; i < 9; ++i) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        board.appendChild(cell);
    }
    
    document.getElementById('play-again').style.display = 'none';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', updateCellValue));
}

function updateCellValue() {
    const index = this.dataset.index;
    if (gameActive && boardState[index] === '') {
        boardState[index] = currentPlayer;
        this.innerText = currentPlayer;
        
        if (checkForWinner()) {
            endGame(`${currentPlayer} WINS!`);
        } else if (boardState.every(cell => cell)) {
            endGame('It\'s a Tie!');
        } else {
            if (currentPlayer === 'X') {
                currentPlayer = 'O';
            } else {
                currentPlayer = 'X';
            }
        }
    }
}

function checkForWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function endGame(message) {
    document.getElementById('winnerIs').innerText = message;
    gameActive = false;
    document.getElementById('play-again').style.display = 'block';
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('winnerIs').innerText = '';
    document.getElementById('play-again').style.display = 'none';

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerText = '');
}

window.onload = initializeGame;
