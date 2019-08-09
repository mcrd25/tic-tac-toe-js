export const board = (() => {
	let grid = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];

	const returnBoard = () => {
		return grid;
	}
	const getCell = (row, cell) => {
		return grid[row][cell]
	}

	const setCell = (row, col, value) => {
		if (grid[row][col] === null) {
			grid[row][col] = value
		}
	}

	return {
		returnBoard,
		getCell,
		setCell
	}
})();

