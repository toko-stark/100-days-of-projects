const c = document.getElementById('c'), ctx = c.getContext('2d');
const CH = 'アァカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
let cols, drops;
function resize() {
  c.width = innerWidth; c.height = innerHeight;
  cols = Math.floor(c.width / 18);
  drops = Array(cols).fill(0).map(() => Math.random() * c.height);
}
addEventListener('resize', resize); resize();
function loop() {
  ctx.fillStyle = 'rgba(0,0,0,.06)';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#0f0'; ctx.font = '16px monospace';
  for (let i = 0; i < cols; i++) {
    ctx.fillText(CH[Math.floor(Math.random()*CH.length)], i*18, drops[i]);
    if (drops[i] > c.height && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 18;
  }
  requestAnimationFrame(loop);
}
loop();
