const N = 5;
let g;
function start() {
  g = Array.from({length:N}, () => Array(N).fill(false));
  for (let i = 0; i < 15; i++) toggle(Math.floor(Math.random()*N), Math.floor(Math.random()*N), false);
  render();
}
function toggle(x, y, check = true) {
  [[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy]) => {
    const nx = x+dx, ny = y+dy;
    if (nx>=0 && ny>=0 && nx<N && ny<N) g[ny][nx] = !g[ny][nx];
  });
  if (check) {
    render();
    if (g.flat().every(v => !v)) setTimeout(() => alert('🏆 Lights out!'), 50);
  }
}
function render() {
  const b = document.getElementById('board');
  b.innerHTML = '';
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const d = document.createElement('div');
    d.className = 'cell' + (g[y][x] ? ' on' : '');
    d.onclick = () => toggle(x, y);
    b.appendChild(d);
  }
}
document.getElementById('reset').onclick = start;
start();
