const norm = s => s.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
function check() {
  const a = document.getElementById('a').value, b = document.getElementById('b').value;
  const r = document.getElementById('r');
  if (!a || !b) { r.textContent = ''; return; }
  if (norm(a) === norm(b) && a.toLowerCase() !== b.toLowerCase()) { r.textContent = '✓ Anagram!'; r.className = 'result ok'; }
  else { r.textContent = '✗ Not an anagram'; r.className = 'result bad'; }
}
document.querySelectorAll('input').forEach(i => i.oninput = check);
check();
