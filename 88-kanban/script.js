const COLS = ['todo','doing','done'];
const LABELS = { todo: '📝 To Do', doing: '⚡ Doing', done: '✅ Done' };
let data = JSON.parse(localStorage.getItem('kanban88') || 'null') || { todo: ['Design hub'], doing: ['Build projects'], done: ['Setup repo'] };
const save = () => localStorage.setItem('kanban88', JSON.stringify(data));

function render() {
  const b = document.getElementById('board');
  b.innerHTML = COLS.map(c => `
    <div class="col" data-c="${c}">
      <h2>${LABELS[c]} <button data-add="${c}">+</button></h2>
      <div class="drop" data-c="${c}">
        ${data[c].map((t,i) => `<div class="card" draggable="true" data-c="${c}" data-i="${i}">${t}<span class="x" data-del="${c}-${i}">×</span></div>`).join('')}
      </div>
    </div>`).join('');
  document.querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
    const t = prompt('Task:'); if (t) { data[b.dataset.add].push(t); save(); render(); }
  });
  document.querySelectorAll('[data-del]').forEach(b => b.onclick = e => {
    e.stopPropagation();
    const [c,i] = b.dataset.del.split('-'); data[c].splice(+i, 1); save(); render();
  });
  let dragged;
  document.querySelectorAll('.card').forEach(card => {
    card.ondragstart = () => { dragged = card; card.classList.add('drag'); };
    card.ondragend = () => card.classList.remove('drag');
  });
  document.querySelectorAll('.col').forEach(col => {
    col.ondragover = e => { e.preventDefault(); col.classList.add('over'); };
    col.ondragleave = () => col.classList.remove('over');
    col.ondrop = () => {
      col.classList.remove('over');
      if (!dragged) return;
      const from = dragged.dataset.c, idx = +dragged.dataset.i, to = col.dataset.c;
      const [item] = data[from].splice(idx, 1);
      data[to].push(item); save(); render();
    };
  });
}
render();
