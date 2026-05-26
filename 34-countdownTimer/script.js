let t, rem = 0;
const d = document.getElementById('d');
const fmt = n => `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;

document.getElementById('go').onclick = () => {
  clearInterval(t);
  rem = +m.value * 60 + +s.value;
  d.classList.remove('done');
  d.textContent = fmt(rem);
  t = setInterval(() => {
    rem--;
    d.textContent = fmt(Math.max(0, rem));
    if (rem <= 0) { clearInterval(t); d.textContent = 'DONE!'; d.classList.add('done'); }
  }, 1000);
};
document.getElementById('rs').onclick = () => { clearInterval(t); d.textContent = '00:00'; d.classList.remove('done'); };
