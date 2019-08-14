export const game = (players) => {
	let [currentPlayer, otherPlayer] = players;
	const switchPlayers = () => {
		const temp = currentPlayer;
		currentPlayer = otherPlayer;
        otherPlayer = temp;
    }
    
    const getPlayer = () => {
        return currentPlayer
    }

	return {
        switchPlayers,
        getPlayer
	}
};