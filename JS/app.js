const playerFactory = (name, mark) => {
	  const playTurn = (board, cell) => {
    const idx = board.cells.findIndex(position => position === cell);
    if (board.boardArray[idx] === '') {
      board.render();
      return idx;
    }
    return null;
  };

  return { name, mark, playTurn };

};