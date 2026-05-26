const W = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let g, turn;

function reset() {
  g = Array(9).fill(''); turn = 'X';
  document.getElementById('s').textContent = "Player X's turn";
  document.getElementById('b').innerHTML = g.map((_, i) => `<div class="cell" data-i="${i}"></div>`).join('');
  document.querySelectorAll('.cell').forEach(c => c.onclick = () => play(+c.dataset.i, c));
}
function play(i, el) {
  if (g[i]) return;
  g[i] = turn; el.textContent = turn; el.classList.add(turn.toLowerCase());
  const w = W.find(l => l.every(x => g[x] === turn));
  if (w) { document.getElementById('s').textContent = turn + ' wins!'; g.fill('-'); return; }
  if (g.every(c => c)) { document.getElementById('s').textContent = 'Draw!'; return; }
  turn = turn === 'X' ? 'O' : 'X';
  document.getElementById('s').textContent = `Player ${turn}'s turn`;
}
document.getElementById('reset').onclick = reset;
reset();
