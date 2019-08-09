import { playerFactory } from './components/player';
//const player = require('./components/player');


// PLAYER 
const playerFactory = (name, symbol) => {
	return { name, symbol }
}

// BOARD
const board = (() => {
	let  grid = [
		[null, null, null],
		[null, null, null], 
		[null, null, null]
	];

	const getCell = (row, cell) => {
		return grid[row][cell]
	}

	const setCell = (row, col, value) => {
		grid[row, col] = value;
	}
})();

// GAME

let player_x = player.playerFactory('maya', 'X');
let player_o = player.playerFactory('john', 'X');

console.log(player_x);