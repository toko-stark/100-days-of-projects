const esc = s => s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);
function hl(json) {
  return esc(json).replace(/("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+\.?\d*([eE][+\-]?\d+)?)/g,
    m => {
      let cls = 'n';
      if (/^"/.test(m)) cls = /:$/.test(m) ? 'k' : 's';
      else if (/true|false|null/.test(m)) cls = 'n';
      return `<span class="${cls}">${m}</span>`;
    });
}
function process(indent) {
  const msg = document.getElementById('msg');
  try {
    const parsed = JSON.parse(document.getElementById('in').value);
    document.getElementById('out').innerHTML = hl(JSON.stringify(parsed, null, indent));
    msg.textContent = '✓ Valid JSON'; msg.className = '';
  } catch (e) { msg.textContent = '✗ ' + e.message; msg.className = 'bad'; }
}
document.getElementById('fmt').onclick = () => process(2);
document.getElementById('min').onclick = () => process(0);
process(2);
