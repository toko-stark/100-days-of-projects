let rem = 1500, iv, running = 0, sessions = 0;
const t = document.getElementById('t'), body = document.body;
const upd = () => t.textContent = `${String(Math.floor(rem/60)).padStart(2,'0')}:${String(rem%60).padStart(2,'0')}`;

document.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
  document.querySelectorAll('[data-m]').forEach(x => x.classList.remove('on'));
  b.classList.add('on');
  rem = +b.dataset.m * 60;
  body.classList.toggle('brk', b.dataset.mode === 'brk');
  clearInterval(iv); running = 0;
  document.getElementById('go').textContent = 'Start';
  upd();
});

document.getElementById('go').onclick = function () {
  if (running) { clearInterval(iv); running = 0; this.textContent = 'Start'; }
  else {
    running = 1; this.textContent = 'Pause';
    iv = setInterval(() => {
      rem--; upd();
      if (rem <= 0) {
        clearInterval(iv); running = 0; sessions++;
        document.getElementById('count').textContent = 'Sessions: ' + sessions;
        document.getElementById('go').textContent = 'Start';
      }
    }, 1000);
  }
};
document.getElementById('rs').onclick = () => {
  clearInterval(iv); running = 0;
  rem = +document.querySelector('.on').dataset.m * 60;
  upd(); document.getElementById('go').textContent = 'Start';
};
upd();
