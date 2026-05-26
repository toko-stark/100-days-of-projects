const CATS = {
  Length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, ft: 0.3048, in: 0.0254, yd: 0.9144 },
  Weight: { g: 1, kg: 1000, mg: 0.001, lb: 453.592, oz: 28.3495, ton: 1e6 },
  Volume: { L: 1, mL: 0.001, gal: 3.78541, qt: 0.946, cup: 0.2366 },
  Time:   { s: 1, min: 60, h: 3600, day: 86400, ms: 0.001 },
  Temperature: 'special'
};
const cat = document.getElementById('cat'), from = document.getElementById('from'), to = document.getElementById('to');
Object.keys(CATS).forEach(k => cat.innerHTML += `<option>${k}</option>`);

function fillUnits() {
  const c = cat.value;
  const units = c === 'Temperature' ? ['C','F','K'] : Object.keys(CATS[c]);
  from.innerHTML = to.innerHTML = units.map(u => `<option>${u}</option>`).join('');
  to.selectedIndex = 1 < units.length ? 1 : 0;
  conv();
}
function conv() {
  const c = cat.value, v = +document.getElementById('a').value || 0;
  let r;
  if (c === 'Temperature') {
    let k;
    if (from.value === 'C') k = v + 273.15;
    else if (from.value === 'F') k = (v - 32) * 5/9 + 273.15;
    else k = v;
    if (to.value === 'C') r = k - 273.15;
    else if (to.value === 'F') r = (k - 273.15) * 9/5 + 32;
    else r = k;
  } else {
    r = v * CATS[c][from.value] / CATS[c][to.value];
  }
  document.getElementById('b').value = +r.toFixed(6);
}
cat.onchange = fillUnits;
[from, to, document.getElementById('a')].forEach(e => { e.oninput = conv; e.onchange = conv; });
fillUnits();
