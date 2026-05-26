const ctx = new (window.AudioContext||window.webkitAudioContext)();
let osc = null, gain = null;
const f = document.getElementById('f'), v = document.getElementById('v'), w = document.getElementById('w');
f.oninput = () => {
  document.getElementById('fv').textContent = f.value;
  if (osc) osc.frequency.value = +f.value;
};
v.oninput = () => { if (gain) gain.gain.value = +v.value / 100; };
w.onchange = () => { if (osc) osc.type = w.value; };
document.getElementById('go').onclick = function() {
  if (osc) { osc.stop(); osc.disconnect(); osc = null; this.textContent = '▶ Play'; }
  else {
    osc = ctx.createOscillator(); gain = ctx.createGain();
    osc.type = w.value; osc.frequency.value = +f.value;
    gain.gain.value = +v.value / 100;
    osc.connect(gain); gain.connect(ctx.destination); osc.start();
    this.textContent = '⏸ Stop';
  }
};
