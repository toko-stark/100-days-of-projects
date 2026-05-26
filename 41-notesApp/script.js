let notes = JSON.parse(localStorage.getItem('notes41') || '[]');
let cur = null;
const save = () => localStorage.setItem('notes41', JSON.stringify(notes));

function render() {
  document.getElementById('list').innerHTML = notes.map(n =>
    `<div class="note ${n.id === cur ? 'active' : ''}" data-id="${n.id}">
      <b>${n.title || 'Untitled'}</b>
      <button class="del" data-del="${n.id}">✕</button>
      <small>${new Date(n.t).toLocaleString()}</small>
    </div>`).join('');
  document.querySelectorAll('.note').forEach(el => el.onclick = e => {
    if (e.target.dataset.del) { del(+e.target.dataset.del); return; }
    open_(+el.dataset.id);
  });
}
function add() {
  const n = { id: Date.now(), title: '', body: '', t: Date.now() };
  notes.unshift(n); cur = n.id; save(); render(); open_(n.id);
}
function open_(id) {
  cur = id;
  const n = notes.find(x => x.id === id); if (!n) return;
  title.value = n.title; body.value = n.body; render();
}
function del(id) {
  notes = notes.filter(n => n.id !== id);
  if (cur === id) { cur = null; title.value = body.value = ''; }
  save(); render();
}
[title, body].forEach(el => el.oninput = () => {
  const n = notes.find(x => x.id === cur);
  if (n) { n.title = title.value; n.body = body.value; n.t = Date.now(); save(); render(); }
});
document.getElementById('newBtn').onclick = add;
if (!notes.length) add(); else { cur = notes[0].id; open_(cur); }
