const board = (() => {
  let grid = Array(9).fill(null);

  const returnBoard = () => grid;

  const getCell = (index) => grid[index];

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
    const topleft = [getCell(0), getCell(4), getCell(8)];
    const topright = [getCell(2), getCell(4), getCell(6)];
    return [topleft, topright];
  };

  const rows = () => {
    const first = [getCell(0), getCell(1), getCell(2)];
    const second = [getCell(3), getCell(4), getCell(5)];
    const third = [getCell(6), getCell(7), getCell(8)];
    return [first, second, third];
  };

  const columns = () => {
    const first = [getCell(0), getCell(3), getCell(6)];
    const second = [getCell(1), getCell(4), getCell(7)];
    const third = [getCell(2), getCell(5), getCell(8)];
    return [first, second, third];
  };

  const winningPositions = () => {
    const positions = diagonals().concat(columns()).concat(rows());
    return positions;
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
