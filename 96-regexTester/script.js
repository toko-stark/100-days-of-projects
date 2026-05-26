const esc = s => s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);
function run() {
  const pat = document.getElementById('pat').value, flags = document.getElementById('flags').value;
  const txt = document.getElementById('txt').value;
  const info = document.getElementById('info');
  if (!pat) { document.getElementById('out').textContent = txt; info.textContent = ''; return; }
  try {
    const re = new RegExp(pat, flags);
    const matches = [...txt.matchAll(flags.includes('g') ? re : new RegExp(pat, flags+'g'))];
    let html = esc(txt);
    // highlight in reverse to keep indices
    if (matches.length) {
      let out = '';
      let last = 0;
      for (const m of matches) {
        out += esc(txt.slice(last, m.index)) + '<mark>' + esc(m[0]) + '</mark>';
        last = m.index + m[0].length;
      }
      out += esc(txt.slice(last));
      html = out;
    }
    document.getElementById('out').innerHTML = html;
    info.textContent = `${matches.length} match${matches.length === 1 ? '' : 'es'}`;
    info.classList.remove('err');
  } catch (e) {
    info.textContent = 'Error: ' + e.message; info.classList.add('err');
  }
}
['pat','flags','txt'].forEach(id => document.getElementById(id).oninput = run);
run();
