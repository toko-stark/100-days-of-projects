const M = {A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.'};
const R = Object.fromEntries(Object.entries(M).map(([k,v])=>[v,k]));
const a = document.getElementById('a'), b = document.getElementById('b');
let lock = false;
a.oninput = () => {
  if (lock) return; lock = true;
  b.value = a.value.toUpperCase().split('').map(c => c === ' ' ? '/' : (M[c] || '')).join(' ');
  lock = false;
};
b.oninput = () => {
  if (lock) return; lock = true;
  a.value = b.value.split(' ').map(c => c === '/' ? ' ' : (R[c] || '')).join('');
  lock = false;
};
a.dispatchEvent(new Event('input'));

document.getElementById('play').onclick = async () => {
  const ctx = new (window.AudioContext||window.webkitAudioContext)();
  const unit = 0.1;
  let t = ctx.currentTime;
  for (const ch of b.value) {
    if (ch === '.' || ch === '-') {
      const dur = ch === '.' ? unit : unit*3;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = 700; o.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0.3, t); g.gain.setValueAtTime(0, t+dur);
      o.start(t); o.stop(t+dur);
      t += dur + unit;
    } else if (ch === ' ') t += unit*2;
    else if (ch === '/') t += unit*4;
  }
};
