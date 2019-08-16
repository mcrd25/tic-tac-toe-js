import { playerFactory } from './components/player.js';
import { board } from './components/board.js';
import { game } from './components/game.js';

// GAME
const xSym = 'X';
const oSym = 'O';
let playerX = playerFactory('maya', xSym);
let playerO = playerFactory('john', oSym);

const render = () => {

}

const getSymbol = (symbol) => {
	if (symbol === 'O') return '<i class="material-icons symbol">radio_button_unchecked</i>';
	if (symbol === 'X') return '<i class="material-icons symbol">close</i>';
}

const cells = document.querySelectorAll('.cell');
game.setPlayers([playerX, playerO]);
game.setBoard(board);

cells.forEach(cell => cell.addEventListener('click', function() {
	if (game.getBoard().setCell(this.id, game.getCurrentPlayer().symbol)) {
		this.innerHTML = getSymbol(game.getCurrentPlayer().symbol);
		let gameOver = game.gameOver();
		if (gameOver) {
			if (gameOver === 'W') {
				console.log(`The winner is ${game.getCurrentPlayer().name}`);
			} else {
				console.log(`Games is a draw`);
			}
			game.getBoard().reset();
		}
		if (!gameOver) game.switchPlayers();
	}
	
	
	
}))