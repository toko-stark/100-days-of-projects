const emojis = ['🎮', '🎯', '🎨', '🎪', '🎭', '🎸', '🎺', '🎻'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let startTime = null;
let timerInterval = null;
let canFlip = true;

const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const matchesDisplay = document.getElementById('matches');
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('resetBtn');
const result = document.getElementById('result');

function createCards() {
    cards = [];
    const cardPairs = [...emojis, ...emojis];
    
    // Shuffle cards
    for (let i = cardPairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    
    cardPairs.forEach((emoji, index) => {
        cards.push({
            id: index,
            emoji: emoji,
            flipped: false,
            matched: false
        });
    });
}

function renderCards() {
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.id = card.id;
        
        if (card.flipped) {
            cardElement.classList.add('flipped');
        }
        
        if (card.matched) {
            cardElement.classList.add('matched');
        }
        
        cardElement.innerHTML = `
            <div class="card-front">?</div>
            <div class="card-back">${card.emoji}</div>
        `;
        
        cardElement.addEventListener('click', () => flipCard(card.id));
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(cardId) {
    if (!canFlip) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched) return;
    
    card.flipped = true;
    flippedCards.push(card);
    renderCards();
    
    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        movesDisplay.textContent = moves;
        
        setTimeout(() => {
            checkMatch();
        }, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.emoji === card2.emoji) {
        // Match found!
        card1.matched = true;
        card2.matched = true;
        matchedPairs++;
        matchesDisplay.textContent = `${matchedPairs} / 8`;
        
        if (matchedPairs === 8) {
            endGame();
        }
    } else {
        // No match
        card1.flipped = false;
        card2.flipped = false;
    }
    
    flippedCards = [];
    canFlip = true;
    renderCards();
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = `${elapsed}s`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function endGame() {
    stopTimer();
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeString = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    
    result.textContent = `🎉 Congratulations! You won in ${moves} moves and ${timeString}!`;
    result.className = 'result show success';
}

function resetGame() {
    stopTimer();
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    canFlip = true;
    startTime = null;
    
    movesDisplay.textContent = '0';
    matchesDisplay.textContent = '0 / 8';
    timerDisplay.textContent = '0s';
    result.classList.remove('show');
    
    createCards();
    renderCards();
    startTimer();
}

resetBtn.addEventListener('click', resetGame);

// Initialize game
resetGame();
