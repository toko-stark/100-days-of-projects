const grid = document.getElementById('grid');
for (let i = 0; i < 9; i++) {
  const h = document.createElement('div'); h.className = 'hole';
  const m = document.createElement('div'); m.className = 'mole';
  h.appendChild(m); grid.appendChild(h);
}
const moles = [...document.querySelectorAll('.mole')];
let score = 0, time = 30, running = false, popIv, timeIv;

moles.forEach(m => m.parentElement.onclick = () => {
  if (running && m.classList.contains('up')) {
    score++; document.getElementById('score').textContent = score;
    m.classList.remove('up');
  }
});

function pop() {
  moles.forEach(m => m.classList.remove('up'));
  const n = 1 + Math.floor(Math.random() * 2);
  const idx = new Set();
  while (idx.size < n) idx.add(Math.floor(Math.random() * 9));
  idx.forEach(i => moles[i].classList.add('up'));
}

document.getElementById('start').onclick = () => {
  score = 0; time = 30; running = true;
  document.getElementById('score').textContent = 0;
  document.getElementById('time').textContent = time;
  popIv = setInterval(pop, 700);
  timeIv = setInterval(() => {
    time--; document.getElementById('time').textContent = time;
    if (time <= 0) {
      clearInterval(popIv); clearInterval(timeIv); running = false;
      moles.forEach(m => m.classList.remove('up'));
      alert('Game over! Score: ' + score);
    }
  }, 1000);
};
