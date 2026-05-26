let habits = JSON.parse(localStorage.getItem('habits89') || '[]');
const save = () => localStorage.setItem('habits89', JSON.stringify(habits));
const dayKey = d => d.toISOString().slice(0, 10);
const last14 = () => {
  const out = [];
  for (let i = 13; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); out.push(dayKey(d)); }
  return out;
};
function streak(h) {
  let s = 0;
  for (let i = 0; ; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    if (h.done.includes(dayKey(d))) s++; else break;
  }
  return s;
}
function render() {
  const days = last14();
  document.getElementById('grid').innerHTML = habits.map((h, hi) => `
    <div class="habit">
      <div class="head">
        <div class="name">${h.name} <span class="streak">🔥 ${streak(h)}</span></div>
        <button class="del" data-d="${hi}">✕</button>
      </div>
      <div class="days">${days.map(k =>
        `<div class="day ${h.done.includes(k)?'done':''}" data-h="${hi}" data-k="${k}">${k.slice(5)}</div>`).join('')}</div>
    </div>`).join('');
  document.querySelectorAll('.day').forEach(d => d.onclick = () => {
    const h = habits[+d.dataset.h];
    const k = d.dataset.k;
    if (h.done.includes(k)) h.done = h.done.filter(x => x !== k);
    else h.done.push(k);
    save(); render();
  });
  document.querySelectorAll('.del').forEach(b => b.onclick = () => {
    habits.splice(+b.dataset.d, 1); save(); render();
  });
}
document.getElementById('add').onclick = () => {
  const n = document.getElementById('ni').value.trim();
  if (!n) return;
  habits.push({ name: n, done: [] });
  document.getElementById('ni').value = '';
  save(); render();
};
render();
