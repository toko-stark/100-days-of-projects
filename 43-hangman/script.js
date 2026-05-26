const WORDS = ['javascript','keyboard','elephant','sunshine','adventure','mountain','programming','umbrella','horizon','treasure','butterfly','quantum'];
const g = document.getElementById('g'), ctx = g.getContext('2d');
let word, hidden, wrong, done;

function draw() {
  ctx.clearRect(0,0,200,220);
  ctx.strokeStyle='#18181b'; ctx.lineWidth=3;
  // gallows
  ctx.beginPath(); ctx.moveTo(20,210); ctx.lineTo(150,210);
  ctx.moveTo(50,210); ctx.lineTo(50,20); ctx.lineTo(130,20); ctx.lineTo(130,40); ctx.stroke();
  const parts = [
    () => ctx.beginPath() || ctx.arc(130,55,15,0,7) || ctx.stroke(),
    () => { ctx.beginPath(); ctx.moveTo(130,70); ctx.lineTo(130,140); ctx.stroke(); },
    () => { ctx.beginPath(); ctx.moveTo(130,90); ctx.lineTo(105,115); ctx.stroke(); },
    () => { ctx.beginPath(); ctx.moveTo(130,90); ctx.lineTo(155,115); ctx.stroke(); },
    () => { ctx.beginPath(); ctx.moveTo(130,140); ctx.lineTo(110,180); ctx.stroke(); },
    () => { ctx.beginPath(); ctx.moveTo(130,140); ctx.lineTo(150,180); ctx.stroke(); }
  ];
  for (let i = 0; i < wrong; i++) parts[i]();
}
function start() {
  word = WORDS[Math.floor(Math.random()*WORDS.length)];
  hidden = Array(word.length).fill('_');
  wrong = 0; done = false;
  document.getElementById('msg').textContent='';
  document.getElementById('word').textContent = hidden.join(' ');
  const keys = document.getElementById('keys');
  keys.innerHTML='';
  for (let i = 65; i <= 90; i++) {
    const b = document.createElement('button');
    b.textContent = String.fromCharCode(i);
    b.onclick = () => guess(b.textContent.toLowerCase(), b);
    keys.appendChild(b);
  }
  draw();
}
function guess(ch, btn) {
  if (done) return;
  btn.disabled = true;
  if (word.includes(ch)) {
    btn.classList.add('hit');
    [...word].forEach((c,i) => { if (c === ch) hidden[i] = ch; });
    document.getElementById('word').textContent = hidden.join(' ');
    if (!hidden.includes('_')) { done = true; document.getElementById('msg').textContent='🎉 You won!'; }
  } else {
    btn.classList.add('miss'); wrong++; draw();
    if (wrong >= 6) { done = true; document.getElementById('msg').textContent='💀 Lost. Word was: ' + word; }
  }
}
document.getElementById('reset').onclick = start;
start();
