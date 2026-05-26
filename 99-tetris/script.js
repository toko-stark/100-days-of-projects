const c = document.getElementById('c'), ctx = c.getContext('2d');
const COLS = 10, ROWS = 20, S = 24;
const SHAPES = {
  I: [[1,1,1,1]], O: [[1,1],[1,1]],
  T: [[0,1,0],[1,1,1]], S: [[0,1,1],[1,1,0]],
  Z: [[1,1,0],[0,1,1]], L: [[1,0],[1,0],[1,1]], J: [[0,1],[0,1],[1,1]]
};
const COL = { I:'#22d3ee', O:'#fbbf24', T:'#a855f7', S:'#22c55e', Z:'#ef4444', L:'#f97316', J:'#3b82f6' };
let grid, piece, px, py, score, dropIv;
function newPiece() {
  const k = Object.keys(SHAPES)[Math.floor(Math.random()*7)];
  piece = { shape: SHAPES[k].map(r=>r.slice()), color: COL[k] };
  px = Math.floor(COLS/2) - 1; py = 0;
  if (collide(piece.shape, px, py)) { alert('Game over! Score: ' + score); start(); }
}
function collide(sh, x, y) {
  for (let r = 0; r < sh.length; r++) for (let cc = 0; cc < sh[r].length; cc++) {
    if (!sh[r][cc]) continue;
    const nx = x+cc, ny = y+r;
    if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
    if (ny >= 0 && grid[ny][nx]) return true;
  }
  return false;
}
function merge() {
  for (let r = 0; r < piece.shape.length; r++) for (let cc = 0; cc < piece.shape[r].length; cc++)
    if (piece.shape[r][cc]) grid[py+r][px+cc] = piece.color;
  for (let r = ROWS-1; r >= 0; r--) {
    if (grid[r].every(v => v)) { grid.splice(r, 1); grid.unshift(Array(COLS).fill(0)); score += 100; r++; }
  }
  document.getElementById('score').textContent = score;
  newPiece();
}
function rotate(sh) {
  return sh[0].map((_, i) => sh.map(r => r[i]).reverse());
}
function draw() {
  ctx.fillStyle = '#000'; ctx.fillRect(0,0,c.width,c.height);
  for (let r = 0; r < ROWS; r++) for (let cc = 0; cc < COLS; cc++)
    if (grid[r][cc]) { ctx.fillStyle = grid[r][cc]; ctx.fillRect(cc*S, r*S, S-1, S-1); }
  ctx.fillStyle = piece.color;
  for (let r = 0; r < piece.shape.length; r++) for (let cc = 0; cc < piece.shape[r].length; cc++)
    if (piece.shape[r][cc]) ctx.fillRect((px+cc)*S, (py+r)*S, S-1, S-1);
}
function tick() {
  if (!collide(piece.shape, px, py+1)) py++;
  else merge();
  draw();
}
function start() {
  grid = Array.from({length:ROWS}, () => Array(COLS).fill(0));
  score = 0; document.getElementById('score').textContent = 0;
  newPiece(); draw();
  clearInterval(dropIv); dropIv = setInterval(tick, 500);
}
addEventListener('keydown', e => {
  if (!piece) return;
  if (e.key === 'ArrowLeft' && !collide(piece.shape, px-1, py)) px--;
  else if (e.key === 'ArrowRight' && !collide(piece.shape, px+1, py)) px++;
  else if (e.key === 'ArrowDown') tick();
  else if (e.key === 'ArrowUp') { const r = rotate(piece.shape); if (!collide(r, px, py)) piece.shape = r; }
  draw();
});
start();
