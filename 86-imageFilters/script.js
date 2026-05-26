const F = [
  ['blur','Blur',0,20,0,'px'],
  ['brightness','Brightness',0,200,100,'%'],
  ['contrast','Contrast',0,200,100,'%'],
  ['saturate','Saturate',0,200,100,'%'],
  ['grayscale','Grayscale',0,100,0,'%'],
  ['sepia','Sepia',0,100,0,'%'],
  ['hue-rotate','Hue',0,360,0,'deg'],
  ['invert','Invert',0,100,0,'%']
];
const c = document.querySelector('.ctrls');
F.forEach(([id,label,mn,mx,v,u]) => {
  c.insertAdjacentHTML('beforeend',
    `<label>${label}</label><input type="range" data-id="${id}" data-u="${u}" min="${mn}" max="${mx}" value="${v}"><span data-v="${id}">${v}${u}</span>`);
});
function upd() {
  const filter = F.map(([id,,,,,u]) => {
    const el = c.querySelector(`[data-id="${id}"]`);
    c.querySelector(`[data-v="${id}"]`).textContent = el.value + u;
    return `${id}(${el.value}${u})`;
  }).join(' ');
  document.getElementById('preview').style.filter = filter;
}
c.querySelectorAll('input').forEach(i => i.oninput = upd);
document.getElementById('file').onchange = e => {
  const f = e.target.files[0]; if (!f) return;
  document.getElementById('preview').src = URL.createObjectURL(f);
};
upd();
