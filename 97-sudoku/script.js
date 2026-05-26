function solve(b) {
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
    if (b[r][c] === 0) {
      for (let n = 1; n <= 9; n++) {
        if (ok(b, r, c, n)) {
          b[r][c] = n;
          if (solve(b)) return true;
          b[r][c] = 0;
        }
      }
      return false;
    }
  }
  return true;
}
function ok(b, r, c, n) {
  for (let i = 0; i < 9; i++) if (b[r][i] === n || b[i][c] === n) return false;
  const sr = Math.floor(r/3)*3, sc = Math.floor(c/3)*3;
  for (let y = sr; y < sr+3; y++) for (let x = sc; x < sc+3; x++) if (b[y][x] === n) return false;
  return true;
}
function gen() {
  const b = Array.from({length:9},()=>Array(9).fill(0));
  // seed diagonal blocks
  for (let k = 0; k < 9; k += 3) {
    const nums = [1,2,3,4,5,6,7,8,9].sort(()=>Math.random()-.5);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) b[k+i][k+j] = nums[i*3+j];
  }
  solve(b);
  // remove 45 cells
  let removed = 0;
  while (removed < 48) {
    const r = Math.floor(Math.random()*9), c = Math.floor(Math.random()*9);
    if (b[r][c] !== 0) { b[r][c] = 0; removed++; }
  }
  return b;
}
let puzzle;
function render() {
  const g = document.getElementById('grid');
  g.innerHTML = '';
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
    const cell = document.createElement('div');
    cell.className = 'cell' + (puzzle[r][c] ? ' fixed' : '') + ((r%3===2&&r<8)?' b3r':'') + ((c%3===2&&c<8)?' b3c':'');
    const i = document.createElement('input'); i.maxLength = 1;
    if (puzzle[r][c]) { i.value = puzzle[r][c]; i.readOnly = true; }
    i.dataset.r = r; i.dataset.c = c;
    i.oninput = () => { if (!/^[1-9]$/.test(i.value)) i.value = ''; };
    cell.appendChild(i); g.appendChild(cell);
  }
}
function getBoard() {
  const b = Array.from({length:9},()=>Array(9).fill(0));
  document.querySelectorAll('input').forEach(i => {
    const v = +i.value; b[+i.dataset.r][+i.dataset.c] = isNaN(v) ? 0 : v;
  });
  return b;
}
document.getElementById('new').onclick = () => { puzzle = gen(); render(); document.getElementById('msg').textContent = ''; };
document.getElementById('solve').onclick = () => {
  const b = getBoard();
  if (solve(b)) {
    document.querySelectorAll('input').forEach(i => i.value = b[+i.dataset.r][+i.dataset.c]);
  } else document.getElementById('msg').textContent = 'No solution';
};
document.getElementById('check').onclick = () => {
  const b = getBoard();
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
    const v = b[r][c]; if (!v) { document.getElementById('msg').textContent = 'Incomplete'; return; }
    b[r][c] = 0;
    if (!ok(b, r, c, v)) { document.getElementById('msg').textContent = '✗ Invalid'; b[r][c]=v; return; }
    b[r][c] = v;
  }
  document.getElementById('msg').textContent = '✓ Solved!';
};
puzzle = gen(); render();
