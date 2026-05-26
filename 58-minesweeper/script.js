const N = 10, MINES = 15;
let g, revealed, flagged, over;

function start() {
  g = Array.from({length:N},()=>Array(N).fill(0));
  revealed = Array.from({length:N},()=>Array(N).fill(false));
  flagged = Array.from({length:N},()=>Array(N).fill(false));
  over = false;
  let placed = 0;
  while (placed < MINES) {
    const x = Math.floor(Math.random()*N), y = Math.floor(Math.random()*N);
    if (g[y][x] !== -1) { g[y][x] = -1; placed++; }
  }
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (g[y][x] === -1) continue;
    let c = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const ny = y+dy, nx = x+dx;
      if (ny>=0 && nx>=0 && ny<N && nx<N && g[ny][nx] === -1) c++;
    }
    g[y][x] = c;
  }
  document.getElementById('mc').textContent = MINES;
  render();
}
function render() {
  const b = document.getElementById('board');
  b.style.grid = `repeat(${N},30px)/repeat(${N},30px)`;
  b.innerHTML = '';
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const d = document.createElement('div'); d.className = 'cell';
    if (flagged[y][x] && !revealed[y][x]) { d.classList.add('f'); d.textContent='🚩'; }
    else if (revealed[y][x]) {
      d.classList.add('r');
      if (g[y][x] === -1) { d.classList.add('b'); d.textContent='💣'; }
      else if (g[y][x] > 0) { d.textContent = g[y][x]; d.classList.add('c'+g[y][x]); }
    }
    d.oncontextmenu = e => { e.preventDefault(); if (!over && !revealed[y][x]) { flagged[y][x] = !flagged[y][x]; render(); }};
    d.onclick = () => reveal(x, y);
    b.appendChild(d);
  }
}
function reveal(x, y) {
  if (over || revealed[y][x] || flagged[y][x]) return;
  revealed[y][x] = true;
  if (g[y][x] === -1) { over = true; for (let yy=0;yy<N;yy++) for (let xx=0;xx<N;xx++) if (g[yy][xx]===-1) revealed[yy][xx]=true; render(); setTimeout(()=>alert('💥 BOOM!'),50); return; }
  if (g[y][x] === 0) {
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const ny = y+dy, nx = x+dx;
      if (ny>=0 && nx>=0 && ny<N && nx<N && !revealed[ny][nx]) reveal(nx, ny);
    }
  }
  render();
  let hidden = 0;
  for (let yy=0;yy<N;yy++) for (let xx=0;xx<N;xx++) if (!revealed[yy][xx]) hidden++;
  if (hidden === MINES) { over = true; setTimeout(() => alert('🎉 You won!'), 50); }
}
document.getElementById('reset').onclick = start;
start();
