const c = document.getElementById('c'), ctx = c.getContext('2d');
const W = c.width, H = c.height;
const PW = 80, PH = 10;
let px = (W-PW)/2, bx = W/2, by = H-30, vx = 3, vy = -3;
const bricks = [];
const COLS = 10, ROWS = 5, BW = W/COLS, BH = 22;
for (let r = 0; r < ROWS; r++) for (let col = 0; col < COLS; col++) bricks.push({x:col*BW, y:40+r*BH, alive:true, h:`hsl(${col*30},70%,55%)`});
const keys = {};
addEventListener('keydown', e => keys[e.key] = true);
addEventListener('keyup', e => keys[e.key] = false);

function loop() {
  if (keys['ArrowLeft']) px -= 7;
  if (keys['ArrowRight']) px += 7;
  px = Math.max(0, Math.min(W-PW, px));
  bx += vx; by += vy;
  if (bx < 5 || bx > W-5) vx = -vx;
  if (by < 5) vy = -vy;
  if (by > H-PH-15 && bx > px && bx < px+PW) { vy = -vy; vx += ((bx - (px+PW/2)) / PW) * 4; }
  if (by > H) { bx=W/2; by=H/2; vx=3; vy=-3; }
  for (const b of bricks) {
    if (b.alive && bx > b.x && bx < b.x+BW-2 && by > b.y && by < b.y+BH) { b.alive=false; vy=-vy; break; }
  }
  ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H);
  for (const b of bricks) if (b.alive) { ctx.fillStyle=b.h; ctx.fillRect(b.x+1, b.y+1, BW-2, BH-2); }
  ctx.fillStyle='#fff';
  ctx.fillRect(px, H-PH-5, PW, PH);
  ctx.beginPath(); ctx.arc(bx, by, 6, 0, 7); ctx.fill();
  requestAnimationFrame(loop);
}
loop();
