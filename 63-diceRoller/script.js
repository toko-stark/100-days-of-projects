document.getElementById('roll').onclick = () => {
  const n = +document.getElementById('n').value, s = +document.getElementById('s').value;
  let total = 0;
  const html = [];
  for (let i = 0; i < n; i++) {
    const r = 1 + Math.floor(Math.random()*s);
    total += r; html.push(`<div class="die">${r}</div>`);
  }
  document.getElementById('dice').innerHTML = html.join('');
  document.getElementById('t').textContent = total;
};
