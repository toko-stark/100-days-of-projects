const c = document.getElementById('c'), ctx = c.getContext('2d');
function resize() { c.width = innerWidth; c.height = innerHeight; }
addEventListener('resize', resize); resize();
const parts = [];
addEventListener('mousemove', e => {
  for (let i = 0; i < 5; i++) parts.push({
    x: e.clientX, y: e.clientY,
    vx: (Math.random()-.5)*4, vy: (Math.random()-.5)*4,
    r: 2 + Math.random()*4, life: 1,
    h: (Date.now()/10) % 360
  });
});
function loop() {
  ctx.fillStyle = 'rgba(0,0,0,.15)';
  ctx.fillRect(0, 0, c.width, c.height);
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    p.x += p.vx; p.y += p.vy; p.life -= .02;
    if (p.life <= 0) { parts.splice(i, 1); continue; }
    ctx.fillStyle = `hsla(${p.h},80%,60%,${p.life})`;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, 7); ctx.fill();
  }
  requestAnimationFrame(loop);
}
loop();
