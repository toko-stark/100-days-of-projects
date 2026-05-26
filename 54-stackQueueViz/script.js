const stack = [], queue = [];
const sEl = document.getElementById('stack'), qEl = document.getElementById('queue');
const render = () => {
  sEl.innerHTML = stack.map(v => `<div class="item">${v}</div>`).join('');
  qEl.innerHTML = queue.map(v => `<div class="item">${v}</div>`).join('');
};
const get = () => document.getElementById('val').value || Math.floor(Math.random()*100);
document.querySelectorAll('[data-op]').forEach(b => b.onclick = () => {
  const op = b.dataset.op;
  if (op === 'push') stack.push(get());
  else if (op === 'pop') stack.pop();
  else if (op === 'enqueue') queue.push(get());
  else if (op === 'dequeue') queue.shift();
  document.getElementById('val').value = '';
  render();
});
render();
