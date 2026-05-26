let cols = Array(5).fill(0).map(rand);
let locked = Array(5).fill(false);

function rand() {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
}
function gen() {
  cols = cols.map((c, i) => locked[i] ? c : rand());
  render();
}
function render() {
  document.getElementById('pal').innerHTML = cols.map((c, i) =>
    `<div class="col" style="background:${c}" data-i="${i}">
       <button class="lock" data-lock="${i}">${locked[i] ? '🔒' : '🔓'}</button>
       <div>${c.toUpperCase()}</div>
     </div>`).join('');
  document.querySelectorAll('.col').forEach(el => el.onclick = e => {
    if (e.target.dataset.lock !== undefined) {
      const i = +e.target.dataset.lock; locked[i] = !locked[i]; render();
    } else {
      navigator.clipboard.writeText(cols[+el.dataset.i]);
    }
  });
}
document.getElementById('gen').onclick = gen;
addEventListener('keydown', e => { if (e.code === 'Space') { e.preventDefault(); gen(); } });
render();
