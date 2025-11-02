const playButtons = document.querySelectorAll('.btn');

const gameResults = document.querySelector('.bot-actions');

const scoreYou = document.querySelector('.you');
const scoreComputer = document.querySelector('.computer');

function randomResult() {
  const options = ['Rock', 'Paper', 'Scissors'];
  const randomNumber = Math.floor(Math.random() * options.length);
  const result = options.at(randomNumber);
  return result;
}

document.querySelectorAll('.btn').forEach((button) =>
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const computerAnswer = randomResult();
    const userAnswer = e.target.id;

    let userScoreCur = Number(scoreYou.textContent);
    let computerScoreCur = Number(scoreComputer.textContent);

    console.log(`User: ${userAnswer}, Computer: ${computerAnswer}`);

    if (userAnswer === computerAnswer) {
      gameResults.textContent = `It's a tie! Computer picked ${computerAnswer}`;
    } else if (
      (userAnswer === 'Rock' && computerAnswer === 'Scissors') ||
      (userAnswer === 'Paper' && computerAnswer === 'Rock') ||
      (userAnswer === 'Scissors' && computerAnswer === 'Paper')
    ) {
      gameResults.textContent = `You win, Computer lost! Computer picked ${computerAnswer}`;
      scoreYou.textContent = ++userScoreCur;
    } else {
      gameResults.textContent = `Computer wins, you lost! Computer picked ${computerAnswer}`;
      scoreComputer.textContent = ++computerScoreCur;
    }
  })
);
