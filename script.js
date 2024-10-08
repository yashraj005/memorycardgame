let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
let totalPairs = 0;

const fruits = [
  '🍎', '🍌', '🍇', '🍓', '🍉', '🍍', '🥝', '🍒', '🍑', '🍋', 
  '🍊', '🥥', '🍐', '🍈', '🍏', '🍔', '🍟', '🍕', '🍪', '🍩'
];

document.getElementById('startButton').addEventListener('click', () => {
  const gridSize = parseInt(document.getElementById('gridSize').value);
  const gameBoard = document.getElementById('gameBoard');

  // Clear any previous content
  gameBoard.innerHTML = '';
  matchesFound = 0;

  // Remove existing grid size classes
  gameBoard.classList.remove('grid-4x4', 'grid-6x6', 'grid-8x8', 'grid-10x10', 'grid-12x12', 'grid-14x14', 'grid-16x16');

  // Add the appropriate class for the selected grid size
  gameBoard.classList.add(`grid-${gridSize}x${gridSize}`);

  // Set up the grid
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  // Generate cards dynamically based on the selected grid size
  const totalCards = gridSize * gridSize;
  totalPairs = totalCards / 2;
  const cardValues = [];

  // Create pairs of values for the cards using fruit emojis
  for (let i = 0; i < totalPairs; i++) {
    cardValues.push(fruits[i % fruits.length]);
    cardValues.push(fruits[i % fruits.length]);
  }

  // Shuffle the cards
  cardValues.sort(() => Math.random() - 0.5);

  // Create card elements
  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardValues[i];
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  }
});

function handleCardClick() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.value; // Show fruit emoji instead of number

  if (!firstCard) {
    // First card clicked
    firstCard = this;
    return;
  }

  // Second card clicked
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    disableCards();
    matchesFound++;
    if (matchesFound === totalPairs) {
      setTimeout(() => alert('You found all matches!'), 300);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.textContent = '';
    secondCard.textContent = '';
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

document.getElementById('resetButton').addEventListener('click', resetGame);

function resetGame() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  document.getElementById('message').textContent = 'Select grid size and start a new game!';
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
