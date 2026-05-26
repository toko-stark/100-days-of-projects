const c = document.getElementById('c'), ctx = c.getContext('2d');
let stars = [];
function resize() { c.width = innerWidth; c.height = innerHeight; }
addEventListener('resize', resize); resize();
for (let i = 0; i < 400; i++) stars.push({ x: (Math.random()-.5)*c.width, y: (Math.random()-.5)*c.height, z: Math.random()*c.width });

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,.3)';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#fff';
  for (const s of stars) {
    s.z -= 4;
    if (s.z <= 0) { s.x = (Math.random()-.5)*c.width; s.y = (Math.random()-.5)*c.height; s.z = c.width; }
    const k = 128 / s.z;
    const px = s.x * k + c.width/2;
    const py = s.y * k + c.height/2;
    if (px < 0 || px > c.width || py < 0 || py > c.height) continue;
    const r = (1 - s.z/c.width) * 3;
    ctx.beginPath(); ctx.arc(px, py, r, 0, 7); ctx.fill();
  }
  requestAnimationFrame(loop);
}
loop();
