const Player = (name = '', marker = '_') => {
  let score = 0;
  const getScore = () => score;
  const setScore = (newPoints) => {
    score += newPoints;
  };

  return {
    name,
    marker,
    getScore,
    setScore,
  };
};

const GameBoard = () => {
  let positions = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

  const getBoard = () => positions;

  const posBlank = (index) => positions[index] === '_';

  const setPos = (index, marker) => {
    if (posBlank(index)) {
      positions[index] = marker;
      return true;
    }
    return posBlank(index);
  };

  const winnerMove = () => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    const lines = winCombos.map((line) => line.map((pos) => positions[pos]).join(''));
    return lines.indexOf('XXX') > -1 || lines.indexOf('OOO') > -1;
  };

  const avlPos = () => {
    let ct = 0;
    for (let i = 0; i < positions.length; i += 1) {
      if (positions[i] === '_') {
        ct += 1;
      }
    }
    return ct;
  };

  const clearBoard = () => {
    positions = positions.map(() => '_');
  };

  return {
    setPos,
    clearBoard,
    getBoard,
    posBlank,
    winnerMove,
    avlPos,
  };
};

const setDefNamesNMarkers = (p1, p2) => {
  if (p1.name === '') {
    p1.name = 'Player 1';
  }
  if (p1.marker === '_') {
    p1.marker = 'X';
  }
  if (p2.name === '') {
    p2.name = 'Player 2';
  }
  if (p2.marker === '_') {
    p2.marker = 'O';
  }
};

const Game = (p1, p2) => {
  let gameOn = true;
  let winner = 'No One';

  let turn = p1;
  const board = GameBoard();
  setDefNamesNMarkers(p1, p2);

  const currentTurn = () => turn;
  const isOn = () => gameOn;
  const getWinner = () => winner;
  const terminate = () => {
    gameOn = false;
  };

  const switchTurns = () => {
    if (turn === p1) {
      turn = p2;
    } else {
      turn = p1;
    }
  };

  // eslint-disable-next-line consistent-return
  const mark = (pos) => {
    const {
      marker,
    } = turn;
    if (board.setPos(pos, marker)) {
      if (board.winnerMove()) {
        winner = turn.name;
        terminate();
      }
      if (board.avlPos() === 0) {
        winner = 'Draw';
        terminate();
      }
      switchTurns();
      return marker.toLowerCase();
    }
  };

  return {
    currentTurn,
    board,
    mark,
    p1,
    p2,
    isOn,
    getWinner,
  };
};

module.exports = { Player, Game, GameBoard };