const ctx = new (window.AudioContext||window.webkitAudioContext)();
let iv = null, beat = 0;
const r = document.getElementById('r'), bpm = document.getElementById('bpm');
function renderDots() {
  const n = +document.getElementById('beats').value;
  document.getElementById('dots').innerHTML = Array(n).fill(0).map((_,i)=>`<div class="dot${i===0?' acc':''}"></div>`).join('');
}
function click(acc) {
  const t = ctx.currentTime;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.frequency.value = acc ? 1500 : 900;
  g.gain.setValueAtTime(0.4, t); g.gain.exponentialRampToValueAtTime(0.001, t+0.05);
  o.connect(g); g.connect(ctx.destination); o.start(); o.stop(t+0.05);
}
function tick() {
  const n = +document.getElementById('beats').value;
  const dots = document.querySelectorAll('.dot');
  dots.forEach(d => d.classList.remove('on'));
  dots[beat]?.classList.add('on');
  click(beat === 0);
  beat = (beat + 1) % n;
}
document.getElementById('go').onclick = function() {
  if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Start'; }
  else { beat = 0; iv = setInterval(tick, 60000 / +r.value); this.textContent = '⏸ Stop'; }
};
r.oninput = () => {
  bpm.textContent = r.value;
  if (iv) { clearInterval(iv); iv = setInterval(tick, 60000 / +r.value); }
};
document.getElementById('beats').oninput = renderDots;
renderDots();
