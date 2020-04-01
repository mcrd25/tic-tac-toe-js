import Game from '../src/js/components/game';
import PlayerFactory from '../src/js/components/player';
import Board from '../src/js/components/board';

describe('Game', () => {
  const player1 = new PlayerFactory('Maya', 'O');
  const player2 = new PlayerFactory('Adriaan', 'X');
  const player3 = new PlayerFactory('player1', 'X');
  const player4 = new PlayerFactory('player2', 'O');
  const players = [player1, player2];
  const players2 = [player3, player4];

  const mockDraw = () => {
    Board.setCell(0, 'X');
    Board.setCell(3, 'X');
    Board.setCell(6, 'O');
    Board.setCell(1, 'O');
    Board.setCell(4, 'O');
    Board.setCell(7, 'X');
    Board.setCell(2, 'X');
    Board.setCell(5, 'X');
    Board.setCell(8, 'O');
  };

  const mockWin = () => {
    Board.setCell(0, 'X');
    Board.setCell(1, 'X');
    Board.setCell(2, 'X');
  };

  describe('setPlayers(players)', () => {
    test('should 2 set players for game from array of two undefineds to array of two PlayerFactory objects', () => {
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
    test('should set gameboard for game from undefined to Board object', () => {
      expect(Game.getBoard()).toBeUndefined();
      Game.setBoard(Board);
      expect(Game.getBoard()).not.toBeUndefined();
      expect(Game.getBoard()).toBe(Board);
    });
  });

  describe('getBoard()', () => {
    test('should get board object once defined and any changes made to Board should be reflected', () => {
      expect(Game.getBoard()).toBe(Board);
      Board.setCell(2, 'X');
      expect(Game.getBoard().getCell(2)).toBe('X');
    });
  });

  describe('getCurrentPlayer()', () => {
    test('should get current player which is by default the first player in setPlayers', () => {
      Game.setPlayers(players);
      expect(Game.getCurrentPlayer()).toBe(player1);
    });
  });

  describe('switchPlayers()', () => {
    test('should successfully change current cplyaer once players set', () => {
      const current = Game.getCurrentPlayer();
      Game.switchPlayers();
      expect(Game.getCurrentPlayer()).not.toBe(current);
      expect(Game.getCurrentPlayer()).toBe(player2);
      Game.switchPlayers();
      expect(Game.getCurrentPlayer()).toBe(current);
    });
  });

  describe('gameOver()', () => {
    test('should return false if game is not draw or there is a winner', () => {
      Board.reset();
      Game.setBoard(Board);
      expect(Game.gameOver()).toBe(false);
      mockWin();
      expect(Game.gameOver()).not.toBe(false);
    });
    test('should return W if there is a winning position on Board', () => {
      Game.getBoard().reset();
      expect(Game.gameOver()).not.toBe('W');
      mockWin();
      expect(Game.gameOver()).toBe('W');
    });
    test('should return D if there is no winning position on Board and board grid is full', () => {
      Game.getBoard().reset();
      expect(Game.gameOver()).not.toBe('D');
      mockDraw();
      expect(Game.gameOver()).toBe('D');
    });
  });
});
