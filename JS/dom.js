// eslint-disable-next-line import/extensions
// import * as gameLogic from './logic.js';
const gameLogic = require('./logic.js');

const newGameBtn = document.getElementById('new-game-btn');
const newGameBox = document.getElementById('new-game-box');
const replayGameBtn = document.getElementById('replay-game-btn');
const winnerBanner = document.querySelector('.winner-banner');
const playerBox = document.getElementById('player-box');
const board = document.getElementById('board');
const cells = document.querySelectorAll('.board-cell');
const p1Badge = document.getElementById('p1-badge');
const p2Badge = document.getElementById('p2-badge');
const resetBtn = document.getElementById('reset-btn');
const gameResult = document.querySelector('.game-result');

let game;
const player1 = gameLogic.Player();
const player2 = gameLogic.Player();

const showActivePlayer = () => {
  if (game.currentTurn() === player1) {
    p1Badge.classList.add('active');
    p2Badge.classList.remove('active');
  }
  if (game.currentTurn() === player2) {
    p2Badge.classList.add('active');
    p1Badge.classList.remove('active');
  }
};

const clearBoard = () => {
  cells.forEach((cell) => {
    if (cell.classList.value.includes('x')) {
      cell.classList.remove('x');
    }
    if (cell.classList.value.includes('o')) {
      cell.classList.remove('o');
    }
    game.board.clearBoard();
  });
};

const gameInit = () => {
  game = gameLogic.Game(player1, player2);
  clearBoard();
  showActivePlayer();
};

const showWinner = () => {
  board.classList.toggle('d-none');
  winnerBanner.classList.toggle('d-none');
  if (game.getWinner() === 'Draw') {
    gameResult.innerHTML = `It's a ${game.getWinner()} !`;
  } else {
    gameResult.innerHTML = `${game.getWinner()} WINS!`;
  }
};

newGameBtn.addEventListener('click', () => {
  gameInit();
  newGameBox.classList.toggle('d-none');
  board.classList.toggle('d-none');
  playerBox.classList.toggle('hidden');
});

replayGameBtn.addEventListener('click', () => {
  gameInit();
  board.classList.toggle('d-none');
  winnerBanner.classList.toggle('d-none');
});

resetBtn.addEventListener('click', () => {
  gameInit();
});

cells.forEach((cell, i) => {
  cell.addEventListener('click', () => {
    if (game.isOn()) {
      cell.classList.add(`${game.mark(i)}`);
      if (game.isOn()) {
        showActivePlayer();
      } else {
        showWinner();
      }
    }
  });
});

p1Badge.addEventListener('click', () => {
  // eslint-disable-next-line no-alert
  const player1Name = prompt('Enter your name: ');
  if (player1Name !== '') {
    player1.name = player1Name;
    p1Badge.textContent = player1.name;
  }
});

p2Badge.addEventListener('click', () => {
  // eslint-disable-next-line no-alert
  const player2Name = prompt('Enter your name: ');
  if (player2Name !== '') {
    player2.name = player2Name;
    p2Badge.textContent = player2.name;
  }
});
