function upd() {
  const c1 = document.getElementById('c1').value;
  const c2 = document.getElementById('c2').value;
  const a = document.getElementById('ang').value;
  const t = document.getElementById('type').value;
  const css = t === 'linear-gradient' ? `linear-gradient(${a}deg, ${c1}, ${c2})` : `radial-gradient(circle, ${c1}, ${c2})`;
  document.getElementById('preview').style.background = css;
  document.getElementById('code').textContent = `background: ${css};`;
}
document.querySelectorAll('input,select').forEach(e => e.oninput = e.onchange = upd);
document.getElementById('copy').onclick = () => navigator.clipboard.writeText(document.getElementById('code').textContent);
upd();
