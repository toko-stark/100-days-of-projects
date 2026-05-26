const START = [
  ['♜','♞','♝','♛','♚','♝','♞','♜'],
  ['♟','♟','♟','♟','♟','♟','♟','♟'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['♙','♙','♙','♙','♙','♙','♙','♙'],
  ['♖','♘','♗','♕','♔','♗','♘','♖']
];
let board, sel = null;
function reset() { board = START.map(r => r.slice()); sel = null; render(); }
function render() {
  const b = document.getElementById('board');
  b.innerHTML = '';
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const sq = document.createElement('div');
    sq.className = 'sq ' + ((r+c)%2 ? 'd' : 'l') + (sel && sel[0]===r && sel[1]===c ? ' sel' : '');
    sq.textContent = board[r][c];
    sq.onclick = () => click(r, c);
    b.appendChild(sq);
  }
}
function click(r, c) {
  if (sel) {
    if (sel[0] === r && sel[1] === c) { sel = null; }
    else { board[r][c] = board[sel[0]][sel[1]]; board[sel[0]][sel[1]] = ''; sel = null; }
  } else if (board[r][c]) sel = [r, c];
  render();
}
document.getElementById('reset').onclick = reset;
reset();
