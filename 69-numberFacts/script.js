async function go(num) {
  const t = document.getElementById('t').value;
  const url = num === 'random'
    ? `http://numbersapi.com/random/${t}`
    : `http://numbersapi.com/${num}/${t}`;
  document.getElementById('out').textContent = 'Loading...';
  try {
    const r = await fetch(url);
    document.getElementById('out').textContent = await r.text();
  } catch (e) {
    document.getElementById('out').textContent = 'Could not fetch (try https).';
  }
}
document.getElementById('go').onclick = () => go(document.getElementById('n').value);
document.getElementById('rand').onclick = () => go('random');
go(42);
