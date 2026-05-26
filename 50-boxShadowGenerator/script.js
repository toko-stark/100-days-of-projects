const fields = [
  ['h','Horizontal','-60','60','8','px'],
  ['v','Vertical','-60','60','12','px'],
  ['blur','Blur','0','100','30','px'],
  ['spread','Spread','-50','50','0','px']
];
const c = document.querySelector('.ctrls');
fields.forEach(([id,label,mn,mx,v,u]) => {
  c.insertAdjacentHTML('beforeend',
    `<label>${label}</label><input type="range" id="${id}" min="${mn}" max="${mx}" value="${v}"><span id="${id}V">${v}${u}</span>`);
});
c.insertAdjacentHTML('beforeend',
  `<label>Color</label><input type="color" id="col" value="#000000"><span></span>
   <label>Inset</label><input type="checkbox" id="inset"><span></span>`);

function upd() {
  const vals = fields.map(([id,,,,,u]) => {
    const v = document.getElementById(id).value;
    document.getElementById(id+'V').textContent = v + u;
    return v + u;
  });
  const col = document.getElementById('col').value;
  const inset = document.getElementById('inset').checked ? 'inset ' : '';
  const css = `${inset}${vals.join(' ')} ${col}`;
  document.getElementById('preview').style.boxShadow = css;
  document.getElementById('code').textContent = `box-shadow: ${css};`;
}
c.querySelectorAll('input').forEach(i => i.oninput = upd);
document.getElementById('copy').onclick = () => navigator.clipboard.writeText(document.getElementById('code').textContent);
upd();
