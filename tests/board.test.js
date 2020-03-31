import Board from '../src/js/components/board';

const allNull = (arr) => arr.every((val) => val === null);

describe('Board', () => {
  describe('returnBoard()', () => {
    const grid = Board.returnBoard();
    test('returns an array when called', () => {
      expect(Array.isArray(grid)).toBe(true);
    });
    test('array returned is of length 9', () => {
      expect(grid.length).toBe(9);
    });
  });
  describe('getCell()', () => {
    test('should return current value of grid in position (0-8)', () => {
      expect(Board.getCell(0)).toBe(null);
      Board.setCell(2, 'X');
      expect(Board.getCell(2)).toBe('X');
    });
  });
  describe('setCell()', () => {
    test('should correctly update cell in board if not occupied', () => {
      expect(Board.getCell(0)).toBe(null);
      expect(Board.setCell(0, 'O')).toBe(true);
      expect(Board.getCell(0)).toBe('O');
    });
    test('should not update cell if already occupied', () => {
      const cellValue = Board.getCell(0);
      expect(Board.setCell(0, 'X')).toBe(false);
      expect(Board.getCell(0)).toBe(cellValue);
    });
  });
  describe('winningPositions()', () => {
    const positions = Board.winningPositions();
    test('should return two dimensional array of winning positions of length 3', () => {
      expect(Array.isArray(positions)).toBe(true);
      for (let i = 0; i < positions.length; i += 1) {
        expect(Array.isArray(positions[i])).toBe(true);
        expect(positions[i].length).toBe(3);
      }
    });
    test('should have 8 winning positions', () => {
      expect(positions.length).toBe(8);
    });
  });


  describe('reset()', () => {
    test('should reset each value of grid to null', () => {
      expect(allNull(Board.returnBoard())).toBe(false);
      Board.reset();
      expect(allNull(Board.returnBoard())).toBe(true);
    });
  });
});
