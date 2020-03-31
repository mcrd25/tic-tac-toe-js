import Game from '../src/js/components/game';


describe('Game', () => {
  const players = ['Maya', 'Adriaan'];
  const players2 = ['player1', 'player2'];
  describe('setPlayers(players)', () => {
    test('should 2 set players for game', () => {
      expect(Game.getPlayers()).toStrictEqual([undefined, undefined]);
      Game.setPlayers(players);
      expect(Game.getPlayers()).not.toStrictEqual([undefined, undefined]);
      expect(Game.getPlayers()).toStrictEqual(players);
    });
  });
  describe('getPlayers()', () => {
    test('should get current players of game once set', () => {
      Game.setPlayers(players2);
      expect(Game.getPlayers()).toStrictEqual(players2);
      Game.setPlayers(players);
      expect(Game.getPlayers()).not.toStrictEqual(players2);
      expect(Game.getPlayers()).toStrictEqual(players);
    });
  });
  describe('setBoard(board)', () => {

  });

  describe('getBoard()', () => {

  });

  describe('getCurrentPlayer()', () => {

  });

  describe('switchPlayers()', () => {

  });

  describe('gameOver()', () => {

  });
});
