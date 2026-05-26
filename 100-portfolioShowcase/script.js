const milestones = [
  { d: 1, n: 'Rock Paper Scissors', path: '../01-RockPaperScissors/', note: 'The journey begins.' },
  { d: 11, n: 'Snake', path: '../11-snake/', note: 'First arcade classic.' },
  { d: 20, n: 'Weather App', path: '../20-weatherApp/', note: 'First real API integration.' },
  { d: 33, n: 'Stopwatch', path: '../33-stopwatch/', note: 'Time gets serious.' },
  { d: 45, n: 'Maze Generator', path: '../45-mazeGenerator/', note: 'Recursive backtracking.' },
  { d: 59, n: '2048', path: '../59-2048/', note: 'Just one more turn.' },
  { d: 68, n: 'Recipe Finder', path: '../68-recipeFinder/', note: 'Real-world API again.' },
  { d: 77, n: 'Matrix Rain', path: '../77-matrixRain/', note: 'Wake up, Neo.' },
  { d: 88, n: 'Kanban Board', path: '../88-kanban/', note: 'Drag-and-drop, persistence.' },
  { d: 99, n: 'Tetris', path: '../99-tetris/', note: 'A childhood, recreated.' },
  { d: 100, n: 'The Showcase', path: './', note: 'You are here.' }
];
document.getElementById('timeline').innerHTML = milestones.map(m => `
  <div class="item">
    <div class="card">
      <a href="${m.path}">Day ${m.d} — ${m.n}</a>
      <small>${m.note}</small>
    </div>
    <div class="dot"></div>
    <div class="card">
      <a href="${m.path}">Day ${m.d} — ${m.n}</a>
      <small>${m.note}</small>
    </div>
  </div>`).join('');

// animate the stats counters
function animateCount(id, target) {
  const el = document.getElementById(id);
  if (target === '∞') { el.textContent = '∞'; return; }
  let n = 0;
  const step = Math.max(1, Math.floor(target/40));
  const iv = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(iv); }
    el.textContent = n + (id === 's2' ? '+' : '');
  }, 30);
}
animateCount('s1', 100);
animateCount('s2', 300);
animateCount('s3', 0);
