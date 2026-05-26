let board, score;
const COLORS = {0:['#cdc1b4',''],2:['#eee4da','#776e65'],4:['#ede0c8','#776e65'],8:['#f2b179','#fff'],16:['#f59563','#fff'],32:['#f67c5f','#fff'],64:['#f65e3b','#fff'],128:['#edcf72','#fff'],256:['#edcc61','#fff'],512:['#edc850','#fff'],1024:['#edc53f','#fff'],2048:['#edc22e','#fff']};

function spawn() {
  const empty = [];
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) if (!board[y][x]) empty.push([y,x]);
  if (!empty.length) return;
  const [y,x] = empty[Math.floor(Math.random()*empty.length)];
  board[y][x] = Math.random() < 0.9 ? 2 : 4;
}
function start() { board = Array.from({length:4},()=>Array(4).fill(0)); score = 0; spawn(); spawn(); render(); }
function render() {
  const b = document.getElementById('board');
  b.innerHTML = '';
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
    const v = board[y][x];
    const [bg, fg] = COLORS[v] || ['#3c3a32','#fff'];
    b.innerHTML += `<div class="tile" style="background:${bg};color:${fg}">${v||''}</div>`;
  }
  document.getElementById('score').textContent = score;
}
function slide(row) {
  const a = row.filter(x => x);
  for (let i = 0; i < a.length - 1; i++) if (a[i] === a[i+1]) { a[i] *= 2; score += a[i]; a[i+1] = 0; }
  return [...a.filter(x=>x), 0,0,0,0].slice(0,4);
}
function move(dir) {
  const before = JSON.stringify(board);
  if (dir === 'L') board = board.map(r => slide(r));
  else if (dir === 'R') board = board.map(r => slide(r.reverse()).reverse());
  else {
    for (let x = 0; x < 4; x++) {
      let col = [0,1,2,3].map(y => board[y][x]);
      if (dir === 'D') col.reverse();
      col = slide(col);
      if (dir === 'D') col.reverse();
      for (let y = 0; y < 4; y++) board[y][x] = col[y];
    }
  }
  if (JSON.stringify(board) !== before) { spawn(); render(); }
}
addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') move('L');
  else if (e.key === 'ArrowRight') move('R');
  else if (e.key === 'ArrowUp') move('U');
  else if (e.key === 'ArrowDown') move('D');
});
let sx, sy;
addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; });
addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
  if (Math.abs(dx) > Math.abs(dy)) move(dx>0?'R':'L'); else move(dy>0?'D':'U');
});
document.getElementById('reset').onclick = start;
start();
