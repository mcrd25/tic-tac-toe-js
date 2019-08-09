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
		grid[row, col] = grid[row, col] === null ? value: null;
	}

	return {
		returnBoard,
		getCell,
		setCell
	}
})();

