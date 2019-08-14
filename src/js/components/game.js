export const game = ((players, board) => {
	currentPlayer, otherPlayer = players;
	const switchPlayers = () => {
		const temp = currentPlayer;
		currentPlayer = otherPlayer;
		otherPlayer = temp;
	}

	return {
		switchPlayers
	}
})();