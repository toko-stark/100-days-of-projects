const corners = ['Top-left','Top-right','Bottom-right','Bottom-left'];
const c = document.querySelector('.ctrls');
corners.forEach((label, i) => {
  c.insertAdjacentHTML('beforeend',
    `<label>${label}</label><input type="range" id="r${i}" min="0" max="50" value="20"><span id="r${i}V">20%</span>`);
});
function upd() {
  const v = [0,1,2,3].map(i => {
    const x = document.getElementById('r'+i).value + '%';
    document.getElementById('r'+i+'V').textContent = x;
    return x;
  });
  const css = `${v[0]} ${v[1]} ${v[2]} ${v[3]}`;
  document.getElementById('box').style.borderRadius = css;
  document.getElementById('code').textContent = `border-radius: ${css};`;
}
c.querySelectorAll('input').forEach(i => i.oninput = upd);
document.getElementById('copy').onclick = () => navigator.clipboard.writeText(document.getElementById('code').textContent);
upd();
