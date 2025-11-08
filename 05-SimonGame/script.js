'use strict';

//// SELECTORS and Variables
const titleTxt = document.querySelector('.title h1');
const boxes = document.querySelectorAll('.box');

let lvlCount = 1;
let gameRunning = false;
let colors = ['green', 'red', 'yellow', 'blue'];
let activeLvl = [];
let userSequence = [];
let isPlayingSequence = false;

//////// HELPER FUNCTIONS

function playSound(color) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const frequencies = {
    green: 329.63,
    red: 261.63,
    yellow: 392.0,
    blue: 493.88,
  };

  const frequency = frequencies[color];
  if (!frequency) {
    console.error('Invalid color:', color);
    return;
  }

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.3
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

function highlightBox() {
  isPlayingSequence = true;
  disableBoxes();

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  activeLvl.push(randomColor);

  activeLvl.forEach((color, index) => {
    setTimeout(() => {
      const boxToHighlight = document.querySelector(`.${color}`);
      if (!boxToHighlight) return;

      boxToHighlight.classList.add('--blink');
      playSound(color);

      setTimeout(() => {
        boxToHighlight.classList.remove('--blink');

        if (index === activeLvl.length - 1) {
          setTimeout(() => {
            isPlayingSequence = false;
            enableBoxes();
          }, 200);
        }
      }, 600);
    }, index * 1000);
  });
}

function disableBoxes() {
  boxes.forEach((box) => box.classList.add('disabled'));
}

function enableBoxes() {
  boxes.forEach((box) => box.classList.remove('disabled'));
}

function checkUserInput(clickedColor) {
  const currentStep = userSequence.length - 1;

  if (clickedColor === activeLvl[currentStep]) {
    if (userSequence.length === activeLvl.length) {
      resultFunction('suc');
      userSequence = [];
      setTimeout(() => {
        nextLevel();
      }, 1000);
    }
  } else {
    resultFunction('err');
    gameOver();
  }
}

function nextLevel() {
  lvlCount++;
  titleTxt.textContent = `Level ${lvlCount}`;
  highlightBox();
}

function gameOver() {
  titleTxt.textContent = `Game Over! Score: ${
    lvlCount - 1
  }. Press any key to restart`;
  gameRunning = false;
  lvlCount = 1;
  activeLvl = [];
  userSequence = [];
  enableBoxes();
}

function resultFunction(option) {
  if (option === 'suc') {
    document.body.style.backgroundColor = 'green';
    setTimeout(() => {
      document.body.style.backgroundColor = '#317dcf';
    }, 200);
  } else if (option === 'err') {
    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
      document.body.style.backgroundColor = '#317dcf';
    }, 200);
  }
}

////////  EVENT LISTENERS

const startGame = () => {
  if (!gameRunning) {
    gameRunning = true;
    lvlCount = 1;
    activeLvl = [];
    userSequence = [];
    titleTxt.textContent = `Level ${lvlCount}`;
    highlightBox();

    document.removeEventListener('keydown', startGame);
    document.removeEventListener('click', startGameOnce);
  }
};

const startGameOnce = (e) => {
  if (!e.target.classList.contains('box')) {
    startGame();
  }
};

boxes.forEach((box) => {
  box.addEventListener('click', (e) => {
    if (gameRunning && !isPlayingSequence) {
      const clickedColor =
        e.target.getAttribute('data-color') ||
        e.target.className.split(' ').find((c) => colors.includes(c));

      if (!clickedColor) return;

      e.target.classList.add('--blink');
      playSound(clickedColor);
      setTimeout(() => {
        e.target.classList.remove('--blink');
      }, 300);

      userSequence.push(clickedColor);
      checkUserInput(clickedColor);
    }
  });
});

document.addEventListener('keydown', startGame);
document.addEventListener('click', startGameOnce);
