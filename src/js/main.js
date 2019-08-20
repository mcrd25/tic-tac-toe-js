import { playerFactory } from './components/player.js';
import { board } from './components/board.js';
import { game } from './components/game.js';

// GAME
const xSym = 'X';
const oSym = 'O';
const playerX = playerFactory('maya', xSym);
const playerO = playerFactory('adriaan', oSym);


const render = (container) => {
	const root = document.querySelector(container);
	// startScreen(root);
	// getNames(root);
	createGridDOM(root);
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
	const row = document.querySelector('#main_id');
	console.log(row);
	const cells = document.querySelectorAll('.cell');

	// wait for start click
	// row.addEventListener("click", function() {
		// remove black screen and text
		// row.classList.remove("teal", "card-panel", "z-depth-2");
		// row.removeChild(document.querySelector(".input-field"));
		// createGridDOM(row);
		// draw border bottom
		for (let index = 0; index < cells.length - 3; index++) {
			cells[index].setAttribute("style", "border-bottom: 8px solid black;")
		} 

		// draw other borders
		[0,3].forEach(i => cells[i].classList.add("first"));
		[2,5].forEach(i => cells[i].classList.add("last"));
		cells[6].classList.add("first")
		cells[8].classList.add("last")

	// })
}

const startScreen = (root) => {
	
	const row = document.createElement('div')
	row.classList.add('row');
	row.id = 'main_id';
	row.classList.add("card-panel");
	row.classList.add("teal", "lighten-4", "z-depth-2");

	row.style.height = "600px";
	const h2 = document.createElement('h2');
	h2.innerHTML = "Welcome<br><br>Click to Start";
	h2.id = "start";

	row.appendChild(h2);
	root.appendChild(row);
} 

const getNames = () => {
	const mainRow = document.querySelector('#main_id');
	const form = document.createElement('form');
	const subRow = document.createElement('div');
	const input_x = document.createElement("div");
	const input_o = document.createElement("div");
	const title = document.querySelector('#start');
	const input = document.createElement('input');

	title.addEventListener('click', function() {
		// remove black screen and text
		form.className = 'col s12';
		title.textContent = "Enter your names:";
		subRow.className = 'row';
		input_x.className = "input-field col s12";
		input_o.className = "input-field col s12";
		input.type = 'submit';
		input.className = 'btn teal';
		input.id = 'submit';
		input_x.innerHTML = '<input id="x_name" placeholder="Name of Player X" value="Player X" type="text" class="validate">';
		input_o.innerHTML = '<input id="o_name" placeholder="Name of Player O" value="Player O" type="text" class="validate">';
		
		subRow.appendChild(input_x);
		subRow.appendChild(input_o);
		subRow.appendChild(input);
		form.appendChild(subRow);
		mainRow.appendChild(form);
		getPlayers(form);

	})
}
const getPlayers = (form) => {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const players = [...form.elements].slice(0,2).map(elem => elem.value);
		setPlayers(players);
		// drawGrid();
		createGridDOM(document.querySelector('.container'));
	});
}

const setPlayers = (players) => {
	const [playerXName, playerOName] = players;
	const playerX = playerFactory(playerXName, xSym);
	const playerO = playerFactory(playerOName, oSym);
	game.setPlayers([playerX, playerO]);
}
const getSymbol = (symbol) => {
	if (symbol === 'O') return '<i class="material-icons symbol">radio_button_unchecked</i>';
	if (symbol === 'X') return '<i class="material-icons symbol">clear</i>';
};

render('.container');

const cells = document.querySelectorAll('.cell');
// game.setPlayers([playerX, playerO]);
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