const c = document.getElementById('c'), ctx = c.getContext('2d');
const S = 10, W = c.width/S, H = c.height/S;
let g = Array.from({length:H},()=>Array(W).fill(0)), iv = null;

function draw() {
  ctx.fillStyle = '#000'; ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle = '#10b981';
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++)
    if (g[y][x]) ctx.fillRect(x*S, y*S, S-1, S-1);
}
function step() {
  const n = g.map(r => r.slice());
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const ny = (y+dy+H)%H, nx = (x+dx+W)%W;
      count += g[ny][nx];
    }
    if (g[y][x] && (count < 2 || count > 3)) n[y][x] = 0;
    else if (!g[y][x] && count === 3) n[y][x] = 1;
  }
  g = n; draw();
}
c.onclick = e => {
  const r = c.getBoundingClientRect();
  const x = Math.floor((e.clientX-r.left)*W/r.width), y = Math.floor((e.clientY-r.top)*H/r.height);
  g[y][x] = g[y][x] ? 0 : 1; draw();
};
document.getElementById('step').onclick = step;
document.getElementById('play').onclick = function() {
  if (iv) { clearInterval(iv); iv=null; this.textContent='▶ Play'; }
  else { iv = setInterval(step, 100); this.textContent='⏸ Pause'; }
};
document.getElementById('rand').onclick = () => { for (let y=0;y<H;y++) for (let x=0;x<W;x++) g[y][x] = Math.random()<.25?1:0; draw(); };
document.getElementById('clear').onclick = () => { g = Array.from({length:H},()=>Array(W).fill(0)); draw(); };
document.getElementById('rand').click();
