const c = document.getElementById('c'), ctx = c.getContext('2d');
const W = c.width, H = c.height;
const PH = 80, PW = 10;
let l = H/2 - PH/2, r = H/2 - PH/2;
let bx = W/2, by = H/2, vx = 5, vy = 3;
let sL = 0, sR = 0;
const keys = {};
addEventListener('keydown', e => keys[e.key] = true);
addEventListener('keyup', e => keys[e.key] = false);

function loop() {
  if (keys['w']) l -= 6; if (keys['s']) l += 6;
  if (keys['ArrowUp']) r -= 6; if (keys['ArrowDown']) r += 6;
  l = Math.max(0, Math.min(H-PH, l));
  r = Math.max(0, Math.min(H-PH, r));
  bx += vx; by += vy;
  if (by < 0 || by > H) vy = -vy;
  if (bx < PW + 10 && by > l && by < l + PH) vx = -vx * 1.05;
  if (bx > W - PW - 10 && by > r && by < r + PH) vx = -vx * 1.05;
  if (bx < 0) { sR++; reset(); }
  if (bx > W) { sL++; reset(); }
  ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#fff';
  ctx.fillRect(10, l, PW, PH); ctx.fillRect(W-20, r, PW, PH);
  ctx.beginPath(); ctx.arc(bx, by, 8, 0, 7); ctx.fill();
  ctx.font='40px system-ui'; ctx.textAlign='center';
  ctx.fillText(sL, W/2 - 60, 50); ctx.fillText(sR, W/2 + 60, 50);
  ctx.setLineDash([10,10]); ctx.strokeStyle='#fff5'; ctx.beginPath(); ctx.moveTo(W/2,0); ctx.lineTo(W/2,H); ctx.stroke(); ctx.setLineDash([]);
  requestAnimationFrame(loop);
}
function reset() { bx = W/2; by = H/2; vx = (Math.random()<.5?-1:1)*5; vy = (Math.random()-.5)*6; }
loop();
