export const game = (() => {
	let currentPlayer, otherPlayer, gameboard;

	const setPlayers = (players) => {
		[currentPlayer, otherPlayer] = players;
	}

	const setBoard = (board) => {
		gameboard = board;
	}

	const switchPlayers = () => {
		const temp = currentPlayer;
		currentPlayer = otherPlayer;
		otherPlayer = temp;
  }
    
	const getCurrentPlayer = () => {
		return currentPlayer
	}

	const getBoard = () => {
		return gameboard;
	}

	const gameOver = () => {
		if (isWinner()) return 'W';
		if (isDraw()) return 'D';
		return false;
	}

	const isWinner = () => {
		const positionsArr = gameboard.winningPositions();
		for (let index = 0; index < positionsArr.length; index++) {
			if (isAllEqual(positionsArr[index], positionsArr[index][0])) {
				return true;
			}
		}
		return false;
	}

	const isDraw = () => {
		if (gameboard.returnBoard().some(item => item === null)) return false;
		return true;
	}

	const isAllEqual = (winningPositions, val) => {
		return winningPositions.every(item => item === val && item !== null) 
	}

	return {
		setPlayers,
		setBoard,
		switchPlayers,
		getCurrentPlayer,
		getBoard,
		gameOver
	}
})();