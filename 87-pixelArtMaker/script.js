let down = false;
addEventListener('mousedown', () => down = true);
addEventListener('mouseup', () => down = false);
function make() {
  const n = +document.getElementById('sz').value;
  const g = document.getElementById('grid');
  g.style.grid = `repeat(${n},1fr)/repeat(${n},1fr)`;
  g.innerHTML = '';
  for (let i = 0; i < n*n; i++) {
    const p = document.createElement('div'); p.className = 'p';
    const paint = () => p.style.background = document.getElementById('col').value;
    p.onmousedown = paint;
    p.onmouseover = () => { if (down) paint(); };
    p.oncontextmenu = e => { e.preventDefault(); p.style.background = '#fff'; };
    g.appendChild(p);
  }
}
document.getElementById('make').onclick = make;
document.getElementById('export').onclick = () => {
  const n = +document.getElementById('sz').value;
  const c = document.createElement('canvas'); c.width = c.height = n*16;
  const x = c.getContext('2d');
  [...document.querySelectorAll('.p')].forEach((p, i) => {
    x.fillStyle = p.style.background || '#fff';
    x.fillRect((i%n)*16, Math.floor(i/n)*16, 16, 16);
  });
  const a = document.createElement('a'); a.download='pixel.png'; a.href=c.toDataURL(); a.click();
};
make();
