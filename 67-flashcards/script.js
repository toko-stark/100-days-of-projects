let cards = JSON.parse(localStorage.getItem('fc67') || 'null') || [
  { q: 'Capital of France?', a: 'Paris' },
  { q: '2 + 2', a: '4' },
  { q: 'Speed of light (m/s)?', a: '~299,792,458' }
];
let i = 0;
const save = () => localStorage.setItem('fc67', JSON.stringify(cards));
const inner = document.querySelector('.inner');
function show() {
  if (!cards.length) return;
  document.getElementById('f').textContent = cards[i].q;
  document.getElementById('b').textContent = cards[i].a;
  inner.classList.remove('flipped');
  document.getElementById('count').textContent = `${i+1} / ${cards.length}`;
}
inner.onclick = () => inner.classList.toggle('flipped');
document.getElementById('flip').onclick = () => inner.classList.toggle('flipped');
document.getElementById('prev').onclick = () => { i = (i - 1 + cards.length) % cards.length; show(); };
document.getElementById('next').onclick = () => { i = (i + 1) % cards.length; show(); };
document.getElementById('add').onclick = () => {
  const q = qi.value.trim(), a = ai.value.trim();
  if (!q || !a) return;
  cards.push({ q, a }); save(); qi.value = ai.value = ''; i = cards.length - 1; show();
};
show();
