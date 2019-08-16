import { playerFactory } from './components/player.js';
import { board } from './components/board.js';
import { game } from './components/game.js';

// GAME
const xSym = 'X';
const oSym = 'O';
let playerX = playerFactory('maya', xSym);
let playerO = playerFactory('john', oSym);

const renderGrid = (container) => {
	createGrid(container, 8);
	
}

const createGrid = (container, cells) => {
	const root = document.querySelector(container);
	const grid = document.createElement('div')
	grid.className = 'row'
	for (let index = 0; index <= cells; index++) {
		let cell = document.createElement('div');
		// could add event listener her to each cell
		cell.id = index
		if ([2, 5, 8].includes(index)) {
			cell.className = "cell col s4 last"
		} else if ([0, 3, 6].includes(index)) {
			cell.className = "cell col s4 first"
		} else {
			cell.className = "cell col s4"
		}
		grid.appendChild(cell)
	}
	root.appendChild(grid);
}

const getSymbol = (symbol) => {
	if (symbol === 'O') return '<i class="material-icons symbol">radio_button_unchecked</i>';
	if (symbol === 'X') return '<i class="material-icons symbol">clear</i>';
}

renderGrid('.container');

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