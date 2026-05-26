let root = null;
const c = document.getElementById('c'), ctx = c.getContext('2d');

function insert(node, v) {
  if (!node) return { v, l: null, r: null };
  if (v < node.v) node.l = insert(node.l, v);
  else if (v > node.v) node.r = insert(node.r, v);
  return node;
}
function inorder(n, a = []) { if (!n) return a; inorder(n.l, a); a.push(n.v); inorder(n.r, a); return a; }

function draw() {
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,c.width,c.height);
  if (!root) return;
  const go = (n, x, y, dx) => {
    if (!n) return;
    if (n.l) { ctx.strokeStyle='#d4d4d8'; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-dx,y+70); ctx.stroke(); go(n.l, x-dx, y+70, dx/1.8); }
    if (n.r) { ctx.strokeStyle='#d4d4d8'; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+dx,y+70); ctx.stroke(); go(n.r, x+dx, y+70, dx/1.8); }
    ctx.fillStyle = '#d14622'; ctx.beginPath(); ctx.arc(x,y,22,0,7); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '600 14px JetBrains Mono, monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(n.v, x, y);
  };
  go(root, c.width/2, 40, c.width/4);
  document.getElementById('trav').textContent = 'In-order: ' + inorder(root).join(', ');
}
document.getElementById('ins').onclick = () => {
  const v = +document.getElementById('val').value;
  if (!isNaN(v)) { root = insert(root, v); draw(); document.getElementById('val').value=''; }
};
document.getElementById('rnd').onclick = () => {
  root = null;
  for (let i = 0; i < 8; i++) root = insert(root, Math.floor(Math.random()*99));
  draw();
};
document.getElementById('clr').onclick = () => { root = null; draw(); document.getElementById('trav').textContent=''; };
draw();
