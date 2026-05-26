const c = document.getElementById('c'), ctx = c.getContext('2d');
let drawing = 0, x = 0, y = 0;
ctx.lineCap = 'round'; ctx.lineJoin = 'round';

const pos = e => {
  const r = c.getBoundingClientRect();
  const t = e.touches ? e.touches[0] : e;
  return [t.clientX - r.left, t.clientY - r.top];
};
const start = e => { [x, y] = pos(e); drawing = 1; };
const move = e => {
  if (!drawing) return;
  e.preventDefault();
  const [nx, ny] = pos(e);
  ctx.strokeStyle = col.value; ctx.lineWidth = +sz.value;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(nx, ny); ctx.stroke();
  [x, y] = [nx, ny];
};
const end = () => drawing = 0;
['mousedown', 'touchstart'].forEach(e => c.addEventListener(e, start));
['mousemove', 'touchmove'].forEach(e => c.addEventListener(e, move, { passive: false }));
['mouseup', 'mouseleave', 'touchend'].forEach(e => c.addEventListener(e, end));

document.getElementById('eraser').onclick = () => ctx.globalCompositeOperation = 'destination-out';
document.getElementById('brush').onclick = () => ctx.globalCompositeOperation = 'source-over';
document.getElementById('clear').onclick = () => ctx.clearRect(0, 0, c.width, c.height);
document.getElementById('save').onclick = () => {
  const a = document.createElement('a');
  a.download = 'paint.png'; a.href = c.toDataURL(); a.click();
};
