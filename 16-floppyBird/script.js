const bird = document.querySelector('.bird');
const pipeContainer = document.querySelector('.game');

const pipeSpeed = 2;
const gravitySpeed = 18;

let intervalGravity;
let intervalPipe;
let checkCollisionInterval;

let birdVelocity = 0;
const jumpStrength = -8;
const gravityAcceleration = 0.5;

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (intervalGravity && intervalPipe) {
      logger('Game active', 'info');
      moveBirdUp();
    } else if (!intervalGravity && !intervalPipe) {
      logger('Game started', 'info');
      moveBirdUp();
      startGame();
    }
  }

  console.log(e.code);
});

// Functions
function logger(message, type = 'info') {
  console.log(`[${type.toUpperCase()}]: ${message}`);
}

function gravity() {
  birdVelocity += gravityAcceleration;
  let birdTop = window.getComputedStyle(bird).top;
  birdTop = parseInt(birdTop);
  bird.style.top = `${birdTop + birdVelocity}px`;
}

function getRandomInt() {
  let randomGap = Math.floor(Math.random() * 50) + 150;
  let randomHeightUpper =
    Math.floor(Math.random() * (1000 - randomGap - 100)) + 50;
  let randomHeightLower = 1000 - randomHeightUpper - randomGap;

  return { randomHeightUpper, randomHeightLower };
}

function moveBirdUp() {
  birdVelocity = jumpStrength;
}

function pipeMovement() {
  let pipes = document.querySelectorAll('.pipe');
  let pipeCount = pipes.length;

  if (pipeCount < 2) {
    const { randomHeightUpper, randomHeightLower } = getRandomInt();

    const html = `
          <div class="pipe --0">
            <div class="pipe-top" style="height: ${randomHeightUpper}px"></div>
            <div class="pipe-bottom" style="height: ${randomHeightLower}px"></div>
          </div>`;

    pipeContainer.insertAdjacentHTML('beforeend', html);

    logger('New pipe created', 'Info');
  }

  pipes.forEach((pipe) => {
    let pipeLeft = window.getComputedStyle(pipe).left;
    pipeLeft = parseInt(pipeLeft);
    pipe.style.left = `${pipeLeft - pipeSpeed}px`;
    if (pipeLeft < -80) {
      const score = document.querySelector('.score');
      score.textContent = Number(score.textContent) + 1;
      pipe.remove();
    }
  });
}

function startGame() {
  intervalGravity = setInterval(gravity, gravitySpeed);
  intervalPipe = setInterval(pipeMovement, pipeSpeed);
  checkCollisionInterval = setInterval(checkCollision, 50);
}

function stopGame() {
  clearInterval(intervalGravity);
  clearInterval(intervalPipe);
  clearInterval(checkCollisionInterval);
  intervalGravity = null;
  intervalPipe = null;
  checkCollisionInterval = null;

  const score = document.querySelector('.score');
  score.textContent = '0';

  bird.style.top = `${300}px`;

  let pipes = document.querySelectorAll('.pipe');
  pipes.forEach((pipe) => pipe.remove());

  document.querySelector('.pipes').insertAdjacentHTML(
    'beforeend',
    `     
          <div class="pipe --0" style="left: 500px">
            <div class="pipe-top"></div>
            <div class="pipe-bottom"></div>
          </div>
          
    `
  );

  logger('Game over', 'Info');
}

function checkCollision() {
  let pipes = document.querySelectorAll('.pipe');
  let birdTop = parseInt(window.getComputedStyle(bird).top);
  let birdBottom = parseInt(window.getComputedStyle(bird).bottom);

  if (birdTop <= -10 || birdBottom <= -10) {
    stopGame();
  } else if (pipes.length) {
    pipes.forEach((pipe) => {
      let pipeLeft = parseInt(window.getComputedStyle(pipe).left);
      if (pipeLeft < 100 && pipeLeft > 20) {
        let pipeTopHeight = parseInt(
          window.getComputedStyle(pipe.querySelector('.pipe-top')).height
        );
        let pipeBottomHeight = parseInt(
          window.getComputedStyle(pipe.querySelector('.pipe-bottom')).height
        );
        if (birdTop < pipeTopHeight || birdBottom < pipeBottomHeight) {
          stopGame();
        }
      }
    });
  }
}
