let h = 0, t = 0;
const coin = document.getElementById('coin');
document.getElementById('flip').onclick = () => {
  const result = Math.random() < 0.5 ? 'h' : 't';
  coin.classList.remove('flipping','show-t');
  void coin.offsetWidth;
  coin.classList.add('flipping');
  setTimeout(() => {
    coin.classList.remove('flipping');
    coin.classList.toggle('show-t', result === 't');
    if (result === 'h') { h++; document.getElementById('hc').textContent = h; }
    else { t++; document.getElementById('tc').textContent = t; }
  }, 1000);
};
