'use strict';

const snakeHead = document.querySelector('.snake-head');
const snakeBody = document.querySelectorAll('.snake-body');
const gameArea = document.querySelector('.container-grid');

let gridMultiplier = 20;
let foodAmount = 2;

// 1 = Up, 2 = Right, 3 = Down, 4 = Left
let movingDirection = '';

let snakeHeadPos = [];
let snakeBodyArray = [];
let foodArray = [];

const init = () => {
  // TODO FIX: Prevent Food from spawning on top of Snake Head or other Food

  gameArea.style.gridTemplateRows = `repeat(${gridMultiplier}, 1fr)`;
  gameArea.style.gridTemplateColumns = `repeat(${gridMultiplier}, 1fr)`;

  const randomizeGame = () => {
    randomFoodPos();
    randomSnakePos();
  };

  randomizeGame();
};

const resetGame = () => {
  alert('Game Over!');

  movingDirection = '';
  snakeHeadPos = [];
  snakeBodyArray = [];
  foodArray = [];

  const existingFood = document.querySelectorAll('.food');
  existingFood.forEach((food) => food.remove());
  const existingBodyParts = document.querySelectorAll('.snake-body');
  existingBodyParts.forEach((bodyPart) => bodyPart.remove());

  init();
};

const checkCollision = () => {
  foodArray.forEach((food, index) => {
    if (
      parseInt(snakeHead.style.gridRowStart) === parseInt(food.rowPos) &&
      parseInt(snakeHead.style.gridColumnStart) === parseInt(food.columnPos)
    ) {
      console.log('Food Eaten, extend Snake');
      const foodElements = document.querySelectorAll('.food');
      foodElements[index].remove();
      foodArray.splice(index, 1);
      randomFoodPos(1);
      addSnakeBody();
    }
  });

  snakeBodyArray.forEach((bodyPart) => {
    const bodyRow = parseInt(bodyPart.style.gridRowStart);
    const bodyCol = parseInt(bodyPart.style.gridColumnStart);

    if (
      parseInt(snakeHead.style.gridRowStart) === bodyRow &&
      parseInt(snakeHead.style.gridColumnStart) === bodyCol
    ) {
      console.log('Crashed Into It Self!');
      resetGame();
    }
  });
};

const randomSnakePos = () => {
  let gridRow = Math.floor(Math.random() * gridMultiplier) + 1;
  let gridCol = Math.floor(Math.random() * gridMultiplier) + 1;
  snakeHead.style.gridRowStart = gridRow;
  snakeHead.style.gridColumnStart = gridCol;
  snakeHeadPos.push(gridRow, gridCol);
};

const randomFoodPos = (foodAmountIndex = foodAmount) => {
  for (let i = 0; i < foodAmountIndex; i++) {
    let food = document.createElement('div');
    food.classList.add('food');
    let gridRow = Math.floor(Math.random() * gridMultiplier) + 1;
    let gridCol = Math.floor(Math.random() * gridMultiplier) + 1;

    food.style.gridRowStart = gridRow;
    food.style.gridColumnStart = gridCol;
    gameArea.appendChild(food);

    foodArray.push({
      rowPos: food.style.gridRowStart,
      columnPos: food.style.gridColumnStart,
    });
  }
};

const addSnakeBody = () => {
  let newBodyPart = document.createElement('div');
  newBodyPart.classList.add('snake-body');
  gameArea.appendChild(newBodyPart);
  snakeBodyArray.push(newBodyPart);
};

init();

console.log(foodArray);
console.log(snakeHeadPos);
console.log(snakeBodyArray);

// Arrow Key Movement
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      movingDirection = '1';
      break;
    case 'ArrowRight':
      movingDirection = '2';
      break;
    case 'ArrowDown':
      movingDirection = '3';
      break;
    case 'ArrowLeft':
      movingDirection = '4';
      break;
    default:
      break;
  }
});

const moveSnake = () => {
  let headRow = parseInt(snakeHead.style.gridRowStart);
  let headCol = parseInt(snakeHead.style.gridColumnStart);

  let newRow = headRow;
  let newCol = headCol;
  switch (movingDirection) {
    case '1':
      newRow = headRow - 1;
      break;
    case '2':
      newCol = headCol + 1;
      break;
    case '3':
      newRow = headRow + 1;
      break;
    case '4':
      newCol = headCol - 1;
      break;
    default:
      break;
  }

  snakeBodyArray.forEach((bodyPart, index) => {
    let previousRow = headRow;
    let previousCol = headCol;

    headRow = parseInt(bodyPart.style.gridRowStart) || headRow;
    headCol = parseInt(bodyPart.style.gridColumnStart) || headCol;

    bodyPart.style.gridRowStart = previousRow;
    bodyPart.style.gridColumnStart = previousCol;
  });

  if (
    newRow < 1 ||
    newCol < 1 ||
    newRow > gridMultiplier ||
    newCol > gridMultiplier
  ) {
    resetGame();
    return;
  }

  snakeHead.style.gridRowStart = newRow;
  snakeHead.style.gridColumnStart = newCol;

  checkCollision();
};

setInterval(moveSnake, 200);
