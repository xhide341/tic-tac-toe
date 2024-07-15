// start dialog
const startDialog = document.getElementById('start-dialog');
const roundDialog = document.getElementById('round-dialog');
const inputPlayer1 = document.getElementById('player1');
const inputPlayer2 = document.getElementById('player2');
const startButton = document.getElementById('start');

// main content
const board = document.querySelector('.board');
const cells = Array.from(document.querySelectorAll('.cell'));
let player1Name = document.getElementById('player1-name');
let player2Name = document.getElementById('player2-name');
const player1Score = document.querySelector('.player1-score');
const player2Score = document.querySelector('.player2-score');
const tieTurnScore = document.querySelector('.tie-turn-score');

// round dialog
const newGameButton = document.getElementById('new-game');
const continueGameButton = document.getElementById('continue-game');
const roundWinner = document.getElementById('round-winner');

newGameButton.addEventListener('click', function() {
    roundDialog.close();
    resetScores();
    initializeGame();
});

continueGameButton.addEventListener('click', function() {
    roundDialog.close();
    initializeGame();
});

const turnManager = function(player1, player2) {
    let currentPlayer = player1;

    function switchTurn() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function reset() {
        currentPlayer = player1;
    }

    return {
        switchTurn: switchTurn,
        getCurrentPlayer: getCurrentPlayer,
        reset: reset
    };
};

const gameBoard = function () {

    const turn = turnManager(player1, player2);

    let board = [
        [``, ``, ``],
        [``, ``, ``],
        [``, ``, ``]   
    ];

    cells.forEach((cell, index) => {
        cell.addEventListener('click', function() {
            const row = Math.floor(index / 3);
            const col = index % 3;
            if (board[row][col] === '') {
                makeMove(row, col);
            }
        });
    });

    function makeMove(row, col) {
        const currentPlayer = turn.getCurrentPlayer();
        board[row][col] = currentPlayer;
        cells[row * 3 + col].innerText = currentPlayer;
        cells[row * 3 + col].classList.add('active');
        cells[row * 3 + col].classList.remove('empty');
        cells[row * 3 + col].style.fontSize = '5rem';
        turn.switchTurn();
        checkGameEnd();
    }

    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            }
        }
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i];
            }
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }

        return ``;
    }

    function checkDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    return false;
                }
            }
        }
        return true;
    }

    function resetBoard() {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('active');
            cell.classList.add('empty');
        });
        turn.reset();
    }

    function checkGameEnd() {
        const winner = checkWinner();
        if (winner !== '') {
            announceWinner(winner);
        } else if (checkDraw()) {
            announceDraw();
        }
    }

    function announceWinner(winner) {
        if (winner === 'x') {
            player1Score.innerText = parseInt(player1Score.innerText) + 1;
        } else {
            player2Score.innerText = parseInt(player2Score.innerText) + 1;
        }
        resetBoard();
        roundWinner.innerText = `${winner === 'x' ? player1Name : player2Name} wins!`;
        roundDialog.showModal();
    }
    
    function announceDraw() {
        roundWinner.innerText = "It's a draw!";
        resetBoard();
        roundDialog.showModal();
    }

    return {
        board: board,
        makeMove: makeMove,
        reset: resetBoard,
        checkGameEnd: checkGameEnd
    };

}

startDialog.showModal();
const player1 = 'x';
const player2 = 'o';
let game;

startButton.addEventListener('click', function() {
    if (inputPlayer1.value !== '' || inputPlayer2.value !== '') {
        player1Name = inputPlayer1.value;
        player2Name = inputPlayer2.value;
    } else {
        player1Name = 'Player 1';
        player2Name = 'Player 2';
    }
    startDialog.close();
    initializeGame();
    resetScores();
});

function initializeGame() {
    game = gameBoard(player1, player2);
    game.reset();
}

function resetScores() {
    player1Score.innerText = 0;
    player2Score.innerText = 0;
    tieTurnScore.innerText = 0;
}