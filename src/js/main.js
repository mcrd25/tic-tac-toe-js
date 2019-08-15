import { playerFactory } from './components/player.js';
import { board } from './components/board.js';
import { game } from './components/game.js';

// GAME
const xSym = 'X';
const oSym = 'O';
let playerX = playerFactory('maya', xSym);
let playerO = playerFactory('john', oSym);

const td = document.querySelectorAll('.cells');
game.setPlayers([playerX, playerO]);
game.setBoard(board);

td.forEach(cell => cell.addEventListener('click', function() {
	game.getBoard().setCell(this.id, game.getCurrentPlayer().symbol);
	this.textContent = game.getCurrentPlayer().symbol;
	game.switchPlayers();
	console.log(game.testPositions());
}))