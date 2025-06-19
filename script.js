const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-index'));

  if (!gameState[index] && gameActive) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkResult();
  }
}

function checkResult() {
  let roundWon = false;
  let winningLine = [];

  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      winningLine = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
    winningLine.forEach(index => {
      document.querySelector(`.cell[data-index="${index}"]`).classList.add('win');
    });
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  currentPlayer = 'X';
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = `Player X's turn`;
  renderBoard();
}

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', index);
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  });
}

resetButton.addEventListener('click', resetGame);
renderBoard();