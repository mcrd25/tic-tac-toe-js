import PlayerFactory from '../src/js/components/player';

describe('PlayerFactory', () => {
  const player1 = new PlayerFactory('Maya', 'X');
  const player2 = new PlayerFactory('Adriaan', 'O');
  describe('attributes of factory', () => {
    test('has name attribute', () => {
      expect(player2.name).not.toBeUndefined();
      expect(player1.name).toBe('Maya');
    });
    test('has symbol attribute', () => {
      expect(player1.symbol).not.toBeUndefined();
      expect(player2.symbol).toBe('O');
    });
  });
});
