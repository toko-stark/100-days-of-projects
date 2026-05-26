const C = [
  { n: 'rock', e: '🪨', beats: ['scissors','lizard'] },
  { n: 'paper', e: '📄', beats: ['rock','spock'] },
  { n: 'scissors', e: '✂️', beats: ['paper','lizard'] },
  { n: 'lizard', e: '🦎', beats: ['paper','spock'] },
  { n: 'spock', e: '🖖', beats: ['rock','scissors'] }
];
let ys = 0, cs = 0;
const ch = document.getElementById('choices');
C.forEach(c => {
  const b = document.createElement('button'); b.textContent = c.e; b.title = c.n;
  b.onclick = () => play(c); ch.appendChild(b);
});
function play(you) {
  const cpu = C[Math.floor(Math.random()*5)];
  let msg;
  if (you.n === cpu.n) msg = `Tie! Both chose ${you.e}`;
  else if (you.beats.includes(cpu.n)) { ys++; msg = `You win! ${you.e} beats ${cpu.e}`; }
  else { cs++; msg = `CPU wins! ${cpu.e} beats ${you.e}`; }
  document.getElementById('r').textContent = msg;
  document.getElementById('ys').textContent = ys;
  document.getElementById('cs').textContent = cs;
}
