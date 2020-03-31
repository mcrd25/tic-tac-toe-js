const Game = (() => {
  let currentPlayer;
  let otherPlayer;
  let gameboard;

  const setPlayers = (players) => {
    [currentPlayer, otherPlayer] = players;
  };

  const getPlayers = () => [currentPlayer, otherPlayer];

  const setBoard = (board) => { gameboard = board; };

  const switchPlayers = () => {
    const temp = currentPlayer;
    currentPlayer = otherPlayer;
    otherPlayer = temp;
  };

  const getCurrentPlayer = () => currentPlayer;

  const getBoard = () => gameboard;

  const isAllEqual = (winningPositions, val) => winningPositions.every(
    (item) => item === val && item !== null,
  );

  const isWinner = () => {
    const positionsArr = gameboard.winningPositions();
    for (let index = 0; index < positionsArr.length; index += 1) {
      if (isAllEqual(positionsArr[index], positionsArr[index][0])) {
        return true;
      }
    }
    return false;
  };

  const isDraw = () => {
    if (gameboard.returnBoard().some((item) => item === null)) return false;
    return true;
  };

  const gameOver = () => {
    if (isWinner()) return 'W';
    if (isDraw()) return 'D';
    return false;
  };

  return {
    setPlayers,
    getPlayers,
    setBoard,
    switchPlayers,
    getCurrentPlayer,
    getBoard,
    gameOver,
  };
})();

export default Game;
