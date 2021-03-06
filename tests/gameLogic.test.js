// Expect players are created corroectly
// Expect start with a clean board
//
const gameLogic = require('../JS/logic.js');

const player1 = gameLogic.Player('PlayerOne', 'X');
const player2 = gameLogic.Player('PlayerTwo', 'O');

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

describe('It shoud create a new game', () => {
  test('It should return an object', () => {
    expect(typeof game).toBe('object');
  });
  test('It should be able to mark the board', () => {
    game.mark(0);
    expect(game.board.getBoard()[0]).toBe('X');
  });
  test('It should switch turns after a mark', () => {
    expect(game.currentTurn()).toBe(player2);
  });
  test('It should check if the game on before there is a winner', () => {
    expect(game.isOn()).toBe(true);
  });
  test('It should know when the game is over', () => {
    game.mark(1);
    game.mark(8);
    game.mark(4);
    game.mark(3);
    game.mark(7);
    expect(game.getWinner()).toBe('PlayerTwo');
  });
  test('It should turn the game off once there is a winner', () => {
    expect(game.isOn()).toBe(false);
  });
});