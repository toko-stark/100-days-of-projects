let items = JSON.parse(localStorage.getItem('exp90') || '[]');
const save = () => localStorage.setItem('exp90', JSON.stringify(items));
const fmt = n => '$' + Math.abs(n).toFixed(2);

function render() {
  const inc = items.filter(i => i.a > 0).reduce((s,i) => s+i.a, 0);
  const exp = items.filter(i => i.a < 0).reduce((s,i) => s+i.a, 0);
  document.getElementById('bal').textContent = fmt(inc + exp);
  document.getElementById('inc').textContent = '+' + fmt(inc);
  document.getElementById('exp').textContent = '-' + fmt(exp);
  document.getElementById('list').innerHTML = items.map((i, idx) =>
    `<li class="${i.a < 0 ? 'neg' : ''}"><span>${i.t}</span><span>${i.a < 0 ? '-' : '+'}${fmt(i.a)} <button class="del" data-i="${idx}">✕</button></span></li>`).join('');
  document.querySelectorAll('.del').forEach(b => b.onclick = () => { items.splice(+b.dataset.i, 1); save(); render(); });
}
document.getElementById('addBtn').onclick = () => {
  const t = document.getElementById('t').value.trim(), a = +document.getElementById('a').value;
  if (!t || !a) return;
  items.unshift({ t, a }); document.getElementById('t').value=''; document.getElementById('a').value='';
  save(); render();
};
render();
