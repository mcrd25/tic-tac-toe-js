const board = (() => {
  let grid = Array(9).fill(null);

  const returnBoard = () => {return grid};

  const getCell = index => {return grid[index]};

  const setCell = (index, value) => {
    if (grid[index] === null) {
      grid[index] = value;
      return true;
    }
    return false;
  };

  const reset = () => {
    grid = Array(9).fill(null);
  };

  const diagonals = () => {
    return [
      [getCell(0), getCell(4), getCell(8)],
      [getCell(2), getCell(4), getCell(6)],
    ];
  };

  const rows = () => {
    return [
      [getCell(0), getCell(1), getCell(2)],
      [getCell(3), getCell(4), getCell(5)],
      [getCell(6), getCell(7), getCell(8)],
    ];
  };

  const winningPositions = () => {return diagonals()
    .concat(columns()).concat(rows());};

  const columns = () => {
    return [
      [getCell(0), getCell(3), getCell(6)],
      [getCell(1), getCell(4), getCell(7)],
      [getCell(2), getCell(5), getCell(8)],
    ];
  };

  return {
    returnBoard,
    getCell,
    setCell,
    winningPositions,
    reset,
  };
})();

export default board;
