import { playerFactory } from './components/player.js';
import { board } from './components/board.js';

// GAME

let player_x = playerFactory('maya', 'X');
let player_o = playerFactory('john', 'X');
const x_sym = 'X';
const o_sym = 'O';

console.log(player_x);

board.setCell(0, 0, x_sym);
console.log(board.returnBoard());

const td = document.querySelectorAll('.cells');
td.forEach(cell => cell.addEventListener('click', function() {
	board.setCell(this.id, 'X');
	this.textContent = 'X';
	console.log('Hello')
}))