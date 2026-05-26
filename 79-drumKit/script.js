const PADS = [
  { k: 'A', n: 'Kick', f: 60, t: 'square', d: 0.2 },
  { k: 'S', n: 'Snare', f: 200, t: 'triangle', d: 0.15, noise: true },
  { k: 'D', n: 'Hi-hat', f: 800, t: 'square', d: 0.05, noise: true },
  { k: 'F', n: 'Clap', f: 400, t: 'sawtooth', d: 0.1, noise: true },
  { k: 'G', n: 'Tom', f: 120, t: 'sine', d: 0.2 },
  { k: 'H', n: 'Crash', f: 1200, t: 'square', d: 0.4, noise: true },
  { k: 'J', n: 'Cowbell', f: 600, t: 'square', d: 0.1 },
  { k: 'K', n: 'Perc', f: 880, t: 'triangle', d: 0.1 }
];
const ctx = new (window.AudioContext||window.webkitAudioContext)();
function play(p) {
  const t = ctx.currentTime;
  if (p.noise) {
    const buf = ctx.createBuffer(1, ctx.sampleRate * p.d, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random()*2-1) * (1 - i/d.length);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const g = ctx.createGain(); g.gain.value = 0.3;
    src.connect(g); g.connect(ctx.destination); src.start();
  } else {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = p.t; o.frequency.setValueAtTime(p.f, t);
    o.frequency.exponentialRampToValueAtTime(p.f*0.3, t + p.d);
    g.gain.setValueAtTime(0.4, t); g.gain.exponentialRampToValueAtTime(0.001, t + p.d);
    o.connect(g); g.connect(ctx.destination); o.start(); o.stop(t + p.d);
  }
}
const padsEl = document.getElementById('pads');
PADS.forEach(p => {
  const d = document.createElement('div'); d.className = 'pad';
  d.innerHTML = `<div><div>${p.k}</div><div style="font-size:.7rem;color:#94a3b8">${p.n}</div></div>`;
  d.onmousedown = () => { play(p); d.classList.add('hit'); setTimeout(()=>d.classList.remove('hit'), 100); };
  padsEl.appendChild(d);
  p.el = d;
});
addEventListener('keydown', e => {
  const p = PADS.find(x => x.k.toLowerCase() === e.key.toLowerCase());
  if (p) p.el.onmousedown();
});
