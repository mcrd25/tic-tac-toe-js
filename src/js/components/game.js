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

	const getBoardGrid = () => {
		return board.returnBoard();
	}

	return {
		setPlayers,
		setBoard,
		switchPlayers,
		getCurrentPlayer,
		getBoardGrid
	}
})();