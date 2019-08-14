import { playerFactory } from './components/player.js';
import { board } from './components/board.js';


// GAME
const xSym = 'X';
const oSym = 'O';
let playerX = playerFactory('maya', xSym);
let playerO = playerFactory('john', oSym);


let currentPlayer = playerX
let otherPlayer = playerO
let temp;
const td = document.querySelectorAll('.cells');
td.forEach(cell => cell.addEventListener('click', function() {
	board.setCell(this.id, currentPlayer.symbol);
	this.textContent = currentPlayer.symbol;
	temp = currentPlayer;
	currentPlayer = otherPlayer;
	otherPlayer = temp;
}))