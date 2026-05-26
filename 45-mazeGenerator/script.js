const c = document.getElementById('c'), ctx = c.getContext('2d');
let N = 20, cell, grid, px = 0, py = 0;

function gen() {
  N = +document.getElementById('size').value;
  cell = c.width / N;
  // 4-bit walls: N E S W (1=wall)
  grid = Array.from({length: N}, () => Array.from({length: N}, () => ({ walls: 0b1111, v: false })));
  const stack = [[0, 0]];
  grid[0][0].v = true;
  const dirs = [[0,-1,0b1000,0b0010],[1,0,0b0100,0b0001],[0,1,0b0010,0b1000],[-1,0,0b0001,0b0100]];
  while (stack.length) {
    const [x, y] = stack[stack.length - 1];
    const opts = dirs.filter(([dx,dy]) => {
      const nx = x+dx, ny = y+dy;
      return nx>=0 && ny>=0 && nx<N && ny<N && !grid[ny][nx].v;
    });
    if (!opts.length) { stack.pop(); continue; }
    const [dx, dy, w1, w2] = opts[Math.floor(Math.random()*opts.length)];
    grid[y][x].walls &= ~w1;
    grid[y+dy][x+dx].walls &= ~w2;
    grid[y+dy][x+dx].v = true;
    stack.push([x+dx, y+dy]);
  }
  px = py = 0;
  draw();
}
function draw() {
  ctx.fillStyle = '#fafaf7'; ctx.fillRect(0,0,c.width,c.height);
  ctx.strokeStyle = '#18181b'; ctx.lineWidth = 2;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const w = grid[y][x].walls, X = x*cell, Y = y*cell;
    ctx.beginPath();
    if (w & 0b1000) { ctx.moveTo(X,Y); ctx.lineTo(X+cell,Y); }
    if (w & 0b0100) { ctx.moveTo(X+cell,Y); ctx.lineTo(X+cell,Y+cell); }
    if (w & 0b0010) { ctx.moveTo(X,Y+cell); ctx.lineTo(X+cell,Y+cell); }
    if (w & 0b0001) { ctx.moveTo(X,Y); ctx.lineTo(X,Y+cell); }
    ctx.stroke();
  }
  ctx.fillStyle = '#16a34a';
  ctx.fillRect((N-1)*cell+2,(N-1)*cell+2,cell-4,cell-4);
  ctx.fillStyle = '#d14622';
  ctx.beginPath(); ctx.arc(px*cell+cell/2, py*cell+cell/2, cell/3, 0, 7); ctx.fill();
}
document.getElementById('gen').onclick = gen;
addEventListener('keydown', e => {
  if (!grid) return;
  const w = grid[py][px].walls;
  if (e.key === 'ArrowUp' && !(w & 0b1000)) py--;
  else if (e.key === 'ArrowRight' && !(w & 0b0100)) px++;
  else if (e.key === 'ArrowDown' && !(w & 0b0010)) py++;
  else if (e.key === 'ArrowLeft' && !(w & 0b0001)) px--;
  else return;
  draw();
  if (px === N-1 && py === N-1) setTimeout(() => alert('🏆 You made it!'), 50);
});
gen();
