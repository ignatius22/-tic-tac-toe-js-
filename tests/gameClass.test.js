const gameLogic = require('../JS/logic.js');
// testung gameboard class

const gameBoard = gameLogic.GameBoard();

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
});
