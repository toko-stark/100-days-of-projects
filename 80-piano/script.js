const N = [
  { n: 'C', k: 'a', f: 261.63 },
  { n: 'C#', k: 'w', f: 277.18, b: 1 },
  { n: 'D', k: 's', f: 293.66 },
  { n: 'D#', k: 'e', f: 311.13, b: 1 },
  { n: 'E', k: 'd', f: 329.63 },
  { n: 'F', k: 'f', f: 349.23 },
  { n: 'F#', k: 't', f: 369.99, b: 1 },
  { n: 'G', k: 'g', f: 392 },
  { n: 'G#', k: 'y', f: 415.30, b: 1 },
  { n: 'A', k: 'h', f: 440 },
  { n: 'A#', k: 'u', f: 466.16, b: 1 },
  { n: 'B', k: 'j', f: 493.88 }
];
const ctx = new (window.AudioContext||window.webkitAudioContext)();
function play(f) {
  const t = ctx.currentTime;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'triangle'; o.frequency.value = f;
  g.gain.setValueAtTime(0.3, t); g.gain.exponentialRampToValueAtTime(0.001, t+0.5);
  o.connect(g); g.connect(ctx.destination); o.start(); o.stop(t+0.5);
}
const keys = document.getElementById('keys');
let pos = 0;
N.forEach(n => {
  const k = document.createElement('div');
  k.className = 'k' + (n.b ? ' bl' : '');
  k.textContent = n.k.toUpperCase();
  if (n.b) k.style.left = (pos * 50) + 'px';
  else { pos++; }
  k.onmousedown = () => { play(n.f); k.classList.add('hit'); setTimeout(()=>k.classList.remove('hit'), 200); };
  n.el = k;
  keys.appendChild(k);
});
addEventListener('keydown', e => { const n = N.find(x => x.k === e.key.toLowerCase()); if (n && !e.repeat) n.el.onmousedown(); });
