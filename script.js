const dialog = document.getElementById('dialog');
const inputPlayer1 = document.getElementById('player1');
const inputPlayer2 = document.getElementById('player2');
const startButton = document.getElementById('start');
const board = document.querySelector('.board');

let player1 = 'Player 1';
let player2 = 'Player 2';
dialog.showModal();


startButton.addEventListener('click', function () {
    if (inputPlayer1.value !== '' && inputPlayer2.value !== '') {
        player1 = inputPlayer1.value;
        player2 = inputPlayer2.value;
    }
    dialog.close();
});


// tic tac toe game
// const gameBoard = function () {

//     let board = [
//         [0, 0, 0],
//         [0, 0, 0],
//         [0, 0, 0]   
//     ];

//     // player 1 is x
//     let player1 = 0;
//     // player 2 is o
//     let player2 = 1;

//     function checkWinner(board) {
//         // check rows
//         for (let i = 0; i < 3; i++) {
//             if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
//                 return board[i][0];
//             }
//         }

//         // check columns
//         for (let i = 0; i < 3; i++) {
//             if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
//                 return board[0][i];
//             }
//         }
//         // check diagonals
//         if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
//             return board[0][0];
//         } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
//             return board[0][2];
//         }

//         // return 0 if no winner
//         return 0;
//     }

//     function checkDraw() {
//         let draw = true;
//         for (let i = 0; i < 3; i++) {
//             for (let j = 0; j < 3; j++) {
//                 if (board[i][j] === 0) {
//                     draw = false;
//                 }
//             }
//         }
//         return draw;
//     }

//     function resetBoard() {
//         board = [
//             [0, 0, 0],
//             [0, 0, 0],
//             [0, 0, 0]
//         ];
//     }

//     return {
//         board: board,
//         makeMove: function (x, y) {
//             if (board[x][y] === 0) {
//                 board[x][y] = 1;
//             } else {
//                 board[x][y] = 0;
//             }
//         },
//         reset: function () {
//             resetBoard();
//         },
//         checkWinner: function () {
//             return checkWinner(board);
//         },
//         checkDraw: function () {
//             return checkDraw();
//         },

//     }


// }


