export const board = (() => {
	let grid = Array(9).fill(null)

	const returnBoard = () => {
		return grid;
	}
	const getCell = (index) => {
		return grid[index]
	}

	const setCell = (index, value) => {
		if (grid[index] === null) {
			grid[index] = value
		}
	}

	const winningPositions = () => {
		// array of winning positions
	}

	const diagonals = () => {
		// array of diagonals
	}

	const winningPositionValues = () = {
		// returns bool for values in winning pattern
	}

	return {
		returnBoard,
		getCell,
		setCell,
		winningPositions
	}
})();

