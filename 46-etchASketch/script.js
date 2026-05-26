const grid = document.getElementById('grid');
let down = false;
addEventListener('mousedown', () => down = true);
addEventListener('mouseup', () => down = false);

function build() {
  const n = +document.getElementById('size').value;
  grid.style.grid = `repeat(${n},1fr)/repeat(${n},1fr)`;
  grid.innerHTML = '';
  for (let i = 0; i < n*n; i++) {
    const d = document.createElement('div'); d.className = 'cell';
    d.onmousedown = () => paint(d);
    d.onmouseover = () => { if (down) paint(d); };
    grid.appendChild(d);
  }
}
function paint(d) {
  d.style.background = document.getElementById('rainbow').checked
    ? `hsl(${Math.random()*360},80%,55%)`
    : document.getElementById('col').value;
}
document.getElementById('size').oninput = build;
document.getElementById('clear').onclick = build;
build();
