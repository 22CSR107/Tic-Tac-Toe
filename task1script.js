
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let playerXPoints = 0;
let playerOPoints = 0;
const cells = document.querySelectorAll('.cell');

function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    return winConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}
function checkDraw() {
    return board.every(cell => cell !== '');
}

function makeAIMove() {
    
    let index;
    do {
        index = Math.floor(Math.random() * 9);
    } while (board[index] !== ''); 

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        if (currentPlayer === 'X') {
            playerXPoints++;
            document.getElementById('playerXPoints').textContent = playerXPoints;
        } else {
            playerOPoints++;
            document.getElementById('playerOPoints').textContent = playerOPoints;
        }
        setTimeout(() => {
            alert(`${currentPlayer === 'X' ? 'Player X' : 'Player O'} wins!`);
            resetGame();
        }, 100);
    } else if (checkDraw()) {
        setTimeout(() => {
            alert("It's a draw!");
            resetGame();
        }, 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.id.slice(4); 
        if (board[index] === '') {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());
            
            if (checkWin(currentPlayer) || checkDraw()) {
                if (currentPlayer === 'X') {
                    playerXPoints++;
                    document.getElementById('playerXPoints').textContent = playerXPoints;
                } else {
                    playerOPoints++;
                    document.getElementById('playerOPoints').textContent = playerOPoints;
                }
                setTimeout(() => {
                    alert(`${currentPlayer === 'X' ? 'Player X' : 'Player O'} wins!`);
                    resetGame();
                }, 100);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

                if (currentPlayer === 'O') {
                    setTimeout(makeAIMove, 500);
                }
            }
        }
    });
});

