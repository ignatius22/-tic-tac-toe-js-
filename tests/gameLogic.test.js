// Expect players are created corroectly
// Expect start with a clean board
//
const gameLogic = require('../JS/logic.js');

const player1 = gameLogic.Player('PlayerOne', 'X');
const player2 = gameLogic.Player('PlayerTwo', 'O');

const gameBoard = gameLogic.GameBoard();

const game = gameLogic.Game(player1, player2);

describe('It shoud create Players with names, markers and scores', () => {
  test('It should return an object', () => {
    expect(typeof player1).toBe('object');
  });
  test('It should start with score 0', () => {
    expect(player1.getScore()).toBe(0);
  });
  test('It be able to set the score', () => {
    player1.setScore(5);
    expect(player1.getScore()).toBe(5);
  });
  test('It should be able to get the name of the player', () => {
    expect(player1.name).toBe('PlayerOne');
  });
  test('It should be able to get the marker of the player', () => {
    expect(player1.marker).toBe('X');
  });
});

describe('It shoud create a blank board', () => {
  test('It should return an object', () => {
    expect(typeof gameBoard).toBe('object');
  });
  test('It should start with blank positions', () => {
    expect(gameBoard.getBoard()).toStrictEqual(['_', '_', '_', '_', '_', '_', '_', '_', '_']);
  });
  test('It should be able to check if a position is blank', () => {
    expect(gameBoard.posBlank(0)).toBe(true);
  });
  test('It should be able set a position', () => {
    gameBoard.setPos(1, 'X');
    expect(gameBoard.posBlank(1)).toBe(false);
  });
  test('It should be able get available positions', () => {
    expect(gameBoard.avlPos()).toBe(8);
  });
  test('It should be able to clear the board', () => {
    gameBoard.clearBoard();
    expect(gameBoard.avlPos()).toBe(9);
  });
  test('It should be able to check if the last move was the winner', () => {
    gameBoard.setPos(1, 'X');
    gameBoard.setPos(4, 'X');
    gameBoard.setPos(7, 'X');
    expect(gameBoard.winnerMove()).toBe(true);
  });
});

