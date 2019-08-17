import { playerFactory } from './components/player.js';
import { board } from './components/board.js';
import { game } from './components/game.js';

// GAME
const xSym = 'X';
const oSym = 'O';
let playerX = playerFactory('maya', xSym);
let playerO = playerFactory('john', oSym);

const render = (container) => {
	const root = document.querySelector(container);
	startScreen(root);
	// getNames(root);
	createGridDOM(root, 8);
	drawGrid();
}

const createGridDOM = (root, cells) => {
	const grid = document.querySelector('.row');
	for (let index = 0; index <= cells; index++) {
		let cell = document.createElement('div');
		// could add event listener her to each cell
		cell.id = index
		cell.className = "cell col s4"
		grid.appendChild(cell)
	}
	root.setAttribute("style", "padding-top: 4rem;")
	root.appendChild(grid);
}

const drawGrid = () => {
	const row = document.querySelector('.row');
	const cells = document.querySelectorAll('.cell');

	// wait for start click
	row.addEventListener("click", function() {
		// remove black screen and text
		row.classList.remove("deep-purple", "card-panel", "z-depth-2");
		row.removeChild(document.querySelector("#start"));

		// draw border bottom
		for (let index = 0; index < cells.length - 3; index++) {
			cells[index].setAttribute("style", "border-bottom: 8px solid black;")
		} 

		// draw other borders
		[0,3].forEach(i => cells[i].classList.add("first"));
		[2,5].forEach(i => cells[i].classList.add("last"));
		cells[6].classList.add("first")
		cells[8].classList.add("last")

	})
}

const startScreen = (root) => {
	
	const row = document.createElement('div')
	row.classList.add('row');

	row.classList.add("card-panel");
	row.classList.add("deep-purple", "lighten-4", "z-depth-2");

	const h2 = document.createElement('h2');
	h2.textContent = "CLICK TO START";
	h2.id = "start";

	row.appendChild(h2);
	root.appendChild(row);
} 

// const getNames = () => {
// 	const row = document.querySelector('.row');
// 	const input_x = document.createElement("div");
// 	const input_o = document.createElement("div");
// 	input_x.className = "input-field col s6";
// 	input_o.className = "input-field col s6";
// 	input_x.innerHTML = '<input id="x_name" type="text" class="validate">'
// 	input_o.innerHTML = '<input id="o_name" type="text" class="validate">'
// 	row.appendChild(input_x)
// 	row.appendChild(input_o)

// 	row.addEventListener('click', drawGrid())
// }

const getSymbol = (symbol) => {
	if (symbol === 'O') return '<i class="material-icons symbol">radio_button_unchecked</i>';
	if (symbol === 'X') return '<i class="material-icons symbol">clear</i>';
}

render('.container');

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