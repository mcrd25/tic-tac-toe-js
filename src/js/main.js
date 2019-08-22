import playerFactory from './components/player.js';
import board from './components/board.js';
import game from './components/game.js';

// GAME
const xSym = 'X';
const oSym = 'O';
const container = document.querySelector('.container');

const setPlayers = (players) => {
  const [playerXName, playerOName] = players;
  const playerX = playerFactory(playerXName, xSym);
  const playerO = playerFactory(playerOName, oSym);
  game.setPlayers([playerX, playerO]);
};
const getSymbol = (symbol) => {
  if (symbol === 'O')
    return '<i class="material-icons symbol">radio_button_unchecked</i>';
  if (symbol === 'X') 
    return '<i class="material-icons symbol">clear</i>';
};

const play = (players, replay = false) => {
  const cells = document.querySelectorAll('.cell');
  if (replay === false) {
    setPlayers(players);
  }
  game.setBoard(board);
  changeCells(cells);
};

const removeHelper = (parent, children) => {
  children.forEach(child => {
    parent.removeChild(child);
  });
};

// DOM
const render = (root) => {
  startScreen(root);
};

const startScreen = (root) => {
  const row = document.createElement('div');
  const h2 = document.createElement('h2');
  const startBtn = document.createElement('button');
  row.classList.add('row');
  row.id = 'grid';
  row.classList.add('card-panel');
  row.classList.add('teal', 'lighten-4', 'z-depth-2', 'h-600', 'flex-col');
  h2.innerHTML = 'Welcome,<br><br>Click below to start';
  h2.id = 'title';
  h2.className = 'white-txt';
  startBtn.className = 'btn';
  startBtn.innerHTML = 'Start';
  startBtn.id = 'start';
  row.appendChild(h2);
  row.appendChild(startBtn);
  root.appendChild(row);
  getStarted(startBtn);
};

const getStarted = (start) => {
  const form = createPlayerForm(start);
  getPlayers(form);
};
const createPlayerForm = eventListener => {
  const mainRow = document.querySelector('#grid');
  const title = document.querySelector('#title');
  const form = document.createElement('form');
  const subRow = document.createElement('div');
  const inputX = document.createElement('div');
  const inputO = document.createElement('div');
  const input = document.createElement('input');
  eventListener.addEventListener('click', function() {
    mainRow.classList.add('player-wrapper');
    mainRow.removeChild(eventListener);
    form.className = 'col s12';
    title.textContent = 'Enter your names:';
    subRow.className = 'row';
    inputX.className = 'input-field col s12';
    inputO.className = 'input-field col s12';
    input.type = 'submit';
    input.className = 'btn teal';
    input.id = 'submit';
    input.value = 'PLAY';
    inputX.innerHTML =
      '<input id="x_name" placeholder="Name of Player X" value="Player X" type="text" class="validate">';
    inputO.innerHTML =
      '<input id="o_name" placeholder="Name of Player O" value="Player O" type="text" class="validate">';
    subRow.appendChild(inputX);
    subRow.appendChild(inputO);
    subRow.appendChild(input);
    form.appendChild(subRow);
    mainRow.appendChild(form);
  });
  return form;
};

const getPlayers = (form) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const players = [...form.elements].slice(0, 2).map(elem => elem.value);
    createGridDOM();
    const createdForm = document.querySelector('form');
    const startBtn = document.querySelector('#start');
    const title = document.querySelector('#title');
    drawGrid([createdForm, title]);
    play(players);
  });
};

const createGridDOM = () => {
  const root = document.querySelector('.container');
  const cells = 8;
  const grid = document.querySelector('#grid');
  grid.classList.add('h-600');

  for (let index = 0; index <= cells; index++) {
    let cell = document.createElement('div');
    cell.id = index;
    cell.className = 'cell col s4';
    grid.appendChild(cell);
  }
  root.classList.add('pt-4');
  root.appendChild(grid);
};

const drawGrid = (children = null) => {
  const grid = document.querySelector('#grid');
  drawPlayerTurn(grid);
  const cells = document.querySelectorAll('.cell');
  grid.classList.remove(
    'teal',
    'card-panel',
    'z-depth-2',
    'player-wrapper',
    'flex-col'
  );
  if (children) {
    removeHelper(grid, children);
  }
  [0, 3].forEach(i => cells[i].classList.add('first'));
  [2, 5].forEach(i => cells[i].classList.add('last'));
  cells[6].classList.add('first');
  cells[8].classList.add('last');
};

const drawPlayerTurn = grid => {
  const playerTurnDiv = document.createElement('div');
  playerTurnDiv.id = 'player_turn';
  grid.appendChild(playerTurnDiv);
};

const rematch = () => {
  createGridDOM();
  drawGrid();
  play([], true);
};

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
};

const displayResult = (winner = null) => {
  const grid = document.querySelector('#grid');
  grid.removeChild(document.querySelector('#player_turn'));
  grid.classList.add('teal', 'z-depth-2', 'h-600', 'flex-col');
  const h2 = document.createElement('h2');
  if (winner) {
    h2.innerHTML = `The winner is ${winner}`;
  } else {
    h2.innerHTML = "It's a draw!";
  }
  h2.classList.add('white-txt');
  grid.appendChild(h2);
};

const setPlayerTurn = (div, player) => {
  div.innerHTML = `<h4>It is ${player}'s turn.</h4>`;
};

const changeCells = (cells) => {
  const playerTurnDiv = document.querySelector('#player_turn');
  setPlayerTurn(playerTurnDiv, game.getCurrentPlayer().name);
  cells.forEach(cell => cell.addEventListener('click', function() {
    if (game.getBoard().setCell(this.id, game.getCurrentPlayer().symbol)) {
      this.innerHTML = getSymbol(game.getCurrentPlayer().symbol);
      let gameOver = game.gameOver();
      if (gameOver) {
        removeGrid();
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
    }})
  );
};

const createAskRematchDom = grid => {
  const resultMsg = document.querySelector('h2');
  const question = document.createElement('h3');

  question.innerText = 'Would you like to play again?';
  const input = document.createElement('input');
  const input2 = document.createElement('input');
  const btnDiv = document.createElement('div');
  btnDiv.className = 'btn-div';
  input.type = 'submit';
  input.id = 'yes';
  input.value = 'Yes';
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
};

const reset = () => {
  const container = document.querySelector('.container');
  const grid = document.querySelector('#grid');
  removeHelper(container, [grid]);
  render(container);
};

const removeGrid = () => {
  const grid = document.querySelector('#grid');
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => grid.removeChild(cell));
};

render(container);
