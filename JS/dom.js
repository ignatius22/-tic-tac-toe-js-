const gamePlay = (() => {
  const playerOneName = document.querySelector('#player1');
  const playerTwoName = document.querySelector('#player2');
  const form = document.querySelector('.player-info');
  const resetBtn = document.querySelector('#reset');
  let currentPlayer;
  let playerOne;
  let playerTwo;

  const switchTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };
  const gameRound = () => {
    const board = boardModule;
    const gameStatus = document.querySelector('.game-status');
    if (currentPlayer.name !== '') {
      gameStatus.textContent = `${currentPlayer.name}'s Turn`;
    } else {
      gameStatus.textContent = 'Board: ';
    }
    board.gameBoard.addEventListener('click', (event) => {
      event.preventDefault();
      const play = currentPlayer.playTurn(board, event.target);
      if (play !== null) {
        board.boardArray[play] = `${currentPlayer.mark}`;
        board.render();
        const winStatus = board.checkWin();
        if (winStatus === 'Tie') {
          gameStatus.textContent = 'Tie!';
        } else if (winStatus === null) {
          switchTurn();
          gameStatus.textContent = `${currentPlayer.name}'s Turn`;
        } else {
          gameStatus.textContent = `Winner is ${currentPlayer.name}`;
          board.reset();
          board.render();
        }
      }
    });
  };

  const gameInit = () => {
    if (playerOneName.value !== '' && playerTwoName.value !== '') {
      playerOne = playerFactory(playerOneName.value, 'X');
      playerTwo = playerFactory(playerTwoName.value, 'O');
      currentPlayer = playerOne;
      gameRound();
    }
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (playerOneName.value !== '' && playerTwoName.value !== '') {
      gameInit();
      form.classList.add('hidden');
      document.querySelector('.place').classList.remove('hidden');
    } else {
      window.location.reload();
    }

    resetBtn.addEventListener('click', () => {
      document.querySelector('.game-status').textContent = 'Board: ';
      document.querySelector('#player1').value = '';
      document.querySelector('#player2').value = '';
      window.location.reload();
    });
    return {
      gameInit,
    };
    gamePlay.gameInit();
  });
})();
