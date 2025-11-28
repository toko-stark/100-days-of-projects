const guessInput = document.getElementById('word-input');
const submitBtn = document.getElementById('submit-button');
const resetBtn = document.getElementById('reset-button');

// prettier-ignore
const fiveLetterWords = ['apple','table','chair','light','mouse','water','sound','bread','stone','dream','green','black','white','heart','plant','clear','sweet','craft','drink','trace','flame','sight','touch','pride','train','sharp','cloud','paint','earth','magic','voice','night','brush','spark','river','field','storm','grain','laugh','smile','point','steel','round','tight','scale','level','brand','frame','solid','plain'];

let wordToGuess = '';
wordToGuess = getRandomWord();

(function init() {
  const letterContainer = document.querySelector('.letter-list');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let letter of alphabet) {
    const letterElement = document.createElement('span');
    letterElement.textContent = letter;
    letterElement.classList.add('letter');
    letterElement.classList.add('available');
    letterContainer.appendChild(letterElement);
  }
})();

function getRandomWord() {
  const index = Math.floor(Math.random() * fiveLetterWords.length);
  return fiveLetterWords[index];
}

function showLetterAsUsed(letter) {
  const letterElements = document.querySelectorAll('.letter');
  letterElements.forEach((element) => {
    if (element.textContent.toLowerCase() === letter.toLowerCase()) {
      element.classList.remove('available');
    }
  });
}

submitBtn.addEventListener('click', () => {
  const userGuess = guessInput.value.toLowerCase();
  if (userGuess.length !== 5) {
    alert('Please enter a five-letter word.');
    return;
  }
  if (userGuess === wordToGuess) {
    alert('Congratulations! You guessed the correct word!');
    for (let i = 0; i < 5; i++) {
      const correctLetter = document.querySelector(`.letter-${i + 1}`);
      correctLetter.textContent = wordToGuess[i].toUpperCase();
    }
    for (const letter of wordToGuess) {
      showLetterAsUsed(letter);
    }
  } else {
    const usedLetters = [...userGuess];
    const correctLetters = [...wordToGuess];

    for (const letter of usedLetters) {
      if (correctLetters.includes(letter)) {
        let index = correctLetters.indexOf(letter);
        const foundLetter = document.querySelector(`.letter-${index + 1}`);
        foundLetter.textContent = letter.toUpperCase();
        showLetterAsUsed(letter);
      }
    }
  }
});

resetBtn.addEventListener('click', () => {
  wordToGuess = getRandomWord();
  guessInput.value = '';

  for (let i = 0; i < 5; i++) {
    const letterBox = document.querySelector(`.letter-${i + 1}`);
    letterBox.textContent = '_';
  }

  const letterElements = document.querySelectorAll('.letter');
  letterElements.forEach((element) => {
    element.classList.add('available');
  });

  alert('Game has been reset! Start guessing a new word.');
});
