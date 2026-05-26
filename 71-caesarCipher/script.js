function shift(s, n) {
  return s.split('').map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + n) % 26 + 26) % 26 + 65);
    if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + n) % 26 + 26) % 26 + 97);
    return c;
  }).join('');
}
function upd() {
  const n = +document.getElementById('shift').value;
  document.getElementById('shiftV').textContent = n;
  document.getElementById('out').value = shift(document.getElementById('in').value, n);
}
['shift','in'].forEach(id => document.getElementById(id).oninput = upd);
upd();
