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
		// isWinner
		// draw
		// return false
	}

	const isWinner = () => {
		// checks for board.winningPositions
		const positionsArr = gameboard.winningPositions;
		for (let index = 0; index < positionsArr.length; index++) {
			if (isAllEqual(positionsArr[index])) {
				return true;
			}
		} return false
	}

	const draw = () => {
		//
	}

	const isAllEqual = (winningPositions) => {
		let val = winningPositions[0];
		winningPositions.every(item => item === val && item !== null) 
	}

	const testPositions = () => {
		return gameboard.winningPositions();
	}

	return {
		setPlayers,
		setBoard,
		switchPlayers,
		getCurrentPlayer,
		getBoard,
		gameOver,
		testPositions
	}
})();