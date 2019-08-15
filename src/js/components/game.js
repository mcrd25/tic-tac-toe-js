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
		// winner
		// draw
		// return false
	}

	const winner = () => {
		// checks for board.winningPositions
	}

	const draw = () => {
		//
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