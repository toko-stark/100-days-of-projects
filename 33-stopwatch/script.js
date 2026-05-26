let startT = 0, elapsed = 0, timer = null;
const $t = document.getElementById('time');
const $l = document.getElementById('laps');

const fmt = ms => {
  const h = Math.floor(ms / 3.6e6);
  const m = Math.floor(ms / 6e4) % 60;
  const s = Math.floor(ms / 1e3) % 60;
  const x = Math.floor(ms) % 1e3;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(x).padStart(3,'0')}`;
};
const tick = () => $t.textContent = fmt(elapsed + (performance.now() - startT));

document.getElementById('start').onclick = function () {
  if (timer) { clearInterval(timer); elapsed += performance.now() - startT; timer = null; this.textContent = 'Start'; }
  else { startT = performance.now(); timer = setInterval(tick, 31); this.textContent = 'Stop'; }
};
document.getElementById('lap').onclick = () => {
  if (!timer) return;
  const li = document.createElement('li');
  li.innerHTML = `<span>Lap ${$l.children.length + 1}</span><span>${$t.textContent}</span>`;
  $l.prepend(li);
};
document.getElementById('reset').onclick = () => {
  clearInterval(timer); timer = null; elapsed = 0;
  $t.textContent = '00:00:00.000'; $l.innerHTML = '';
  document.getElementById('start').textContent = 'Start';
};
