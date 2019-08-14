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

	return {
		returnBoard,
		getCell,
		setCell
	}
})();

