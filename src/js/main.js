import { playerFactory } from './components/player.js';
import { board } from './components/board.js';
import { game } from './components/game.js';

// GAME 
const xSym = 'X';
const oSym = 'O';

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

const play = (players, replay = false) => {
	const cells = document.querySelectorAll('.cell');
	if (replay === false) {
		setPlayers(players);
	}
	
	game.setBoard(board);
	changeCells(cells);
};

const getNames = () => {
	const mainRow = document.querySelector('#grid');
	const form = document.createElement('form');
	const subRow = document.createElement('div');
	const input_x = document.createElement('div');
	const input_o = document.createElement('div');
	const title = document.querySelector('#start');
	const input = document.createElement('input');

	title.addEventListener('click', function () {
		mainRow.classList.add('player-wrapper');
		form.className = 'col s12';
		title.textContent = "Enter your names:";
		subRow.className = 'row';
		input_x.className = "input-field col s12";
		input_o.className = "input-field col s12";
		input.type = 'submit';
		input.className = 'btn teal';
		input.id = 'submit';
		input.value = 'PLAY';
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
		const players = [...form.elements].slice(0, 2).map(elem => elem.value);
		createGridDOM();
		const createdForm = document.querySelector('form');
		const startBtn = document.querySelector('#start')
		drawGrid([createdForm, startBtn]);
		play(players);
	});
}

const removeHelper = (parent, children) => {
	children.forEach(child => {
		parent.removeChild(child);
	});

}

// DOM
const render = (root) => {
	startScreen(root);
	getNames(root);
}
const createGridDOM = () => {
	const root = document.querySelector('.container')
	const cells = 8;
	const grid = document.querySelector('#grid');
	grid.setAttribute('style', 'height: 600px;')

	for (let index = 0; index <= cells; index++) {
		let cell = document.createElement('div');
		// could add event listener her to each cell
		cell.id = index
		cell.className = 'cell col s4'
		grid.appendChild(cell)
	}
	root.setAttribute('style', 'padding-top: 4rem;')
	root.appendChild(grid);
}

const drawGrid = (children = null) => {
	const grid = document.querySelector('#grid');
	drawPlayerTurn(grid);
	// const form = document.querySelector('form');
	const cells = document.querySelectorAll('.cell');
	// const start = document.querySelector('#start')
	grid.classList.remove('teal', 'card-panel', 'z-depth-2', 'player-wrapper');
	if (children) {
		removeHelper(grid, children)
	}
	
	// draw other borders
	[0, 3].forEach(i => cells[i].classList.add('first'));
	[2, 5].forEach(i => cells[i].classList.add('last'));
	cells[6].classList.add('first');
	cells[8].classList.add('last');
}

const drawPlayerTurn = (grid) => {
	const playerTurnDiv = document.createElement('div');
	playerTurnDiv.id = 'player_turn';
	grid.appendChild(playerTurnDiv);
}

const startScreen = (root) => {
	const row = document.createElement('div')
	const h2 = document.createElement('h2');
	
	row.classList.add('row');
	row.id = 'grid';
	row.classList.add('card-panel');
	row.classList.add('teal', 'lighten-4', 'z-depth-2');
	row.setAttribute('style', 'display: flex; flex-direction: column; height: 600px;')
	
	h2.innerHTML = 'Welcome<br><br>Click Here to Start';
	h2.id = 'start';
	row.appendChild(h2);
	root.appendChild(row);
} 


const changeCells = (cells) => {
	const playerTurnDiv = document.querySelector('#player_turn');
	setPlayerTurn(playerTurnDiv, game.getCurrentPlayer().name);
	cells.forEach(cell => cell.addEventListener('click', function () {
		if (game.getBoard().setCell(this.id, game.getCurrentPlayer().symbol)) {
			this.innerHTML = getSymbol(game.getCurrentPlayer().symbol);
			let gameOver = game.gameOver();
			if (gameOver) {
				removeGrid()
				if (gameOver === 'W') {
					displayResult(game.getCurrentPlayer().name);
				} else {
					displayResult();	
				}
				game.getBoard().reset();
				askRematch();
				
			}
			if (!gameOver) {
				game.switchPlayers();
				setPlayerTurn(playerTurnDiv, game.getCurrentPlayer().name);
			}
		}
	}));
};

const displayResult = (winner = null) => {
	const grid = document.querySelector('#grid');
	grid.removeChild(document.querySelector('#player_turn'));
	grid.classList.add('teal', 'z-depth-2');
	grid.setAttribute('style', 'display: flex; flex-direction: column; height: 600px;');
	const h2 = document.createElement('h2');
	if (winner) {
		h2.innerHTML = `The winner is ${winner}`;
	} else {
		h2.innerHTML = "It's a draw!";
	}
	h2.classList.add('white-txt');
	grid.appendChild(h2);
}
const setPlayerTurn = (div, player) => {
	div.innerHTML = `<h4>It is ${player}'s turn.</h4>`
}

const askRematch = () => {
	const grid = document.querySelector('#grid');
	const createdElements = createAskRematchDom(grid);
	const yes = document.querySelector('#yes');
	const no = document.querySelector('#no');
	yes.addEventListener('click', () => {
		removeHelper(grid, createdElements);
		rematch();
	});
	no.addEventListener('click', () => {
		reset();
	});

}

const createAskRematchDom = (grid) => {
	const resultMsg = document.querySelector('h2');
	const question = document.createElement('h3');

	question.innerText = 'Would you like to play again?'
	const input = document.createElement('input');
	const input2 = document.createElement('input');
	const btnDiv = document.createElement('div');
	btnDiv.className = 'btn-div';
	input.type = 'submit';
	input.id = 'yes';
	input.value = 'Yes'
	input.className = 'play-btn btn';
	input2.type = 'submit';
	input2.id = 'no';
	input2.value = 'No';
	input2.className = 'play-btn btn';
	grid.appendChild(question);
	btnDiv.appendChild(input);
	btnDiv.appendChild(input2);
	grid.appendChild(btnDiv);
	return [resultMsg, question, btnDiv];
}

const rematch = () => {
	createGridDOM();
	drawGrid();
	play([], true);
}

const reset = () => {
	const container = document.querySelector('.container');
	const grid = document.querySelector('#grid');
	removeHelper(container, [grid]);
	render(container);
}

const removeGrid = () => {
	const grid = document.querySelector('#grid');
	const cells = document.querySelectorAll('.cell');
	cells.forEach(cell => grid.removeChild(cell));
}
const container = document.querySelector('.container');
render(container);

