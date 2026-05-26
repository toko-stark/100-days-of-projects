const pick = document.getElementById('pick'), sw = document.getElementById('sw');

function hexToRgb(h) {
  const n = parseInt(h.slice(1), 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function rgbToHsl(r, g, b) {
  r/=255; g/=255; b/=255;
  const mx = Math.max(r,g,b), mn = Math.min(r,g,b);
  let h, s, l = (mx+mn)/2;
  if (mx === mn) h = s = 0;
  else {
    const d = mx-mn;
    s = l > 0.5 ? d/(2-mx-mn) : d/(mx+mn);
    if (mx === r) h = (g-b)/d + (g<b?6:0);
    else if (mx === g) h = (b-r)/d + 2;
    else h = (r-g)/d + 4;
    h *= 60;
  }
  return [Math.round(h), Math.round(s*100), Math.round(l*100)];
}
function upd() {
  const v = pick.value;
  sw.style.background = v;
  const [r,g,b] = hexToRgb(v), [H,S,L] = rgbToHsl(r,g,b);
  document.getElementById('hex').textContent = v.toUpperCase();
  document.getElementById('rgb').textContent = `rgb(${r}, ${g}, ${b})`;
  document.getElementById('hsl').textContent = `hsl(${H}, ${S}%, ${L}%)`;
}
pick.oninput = upd; upd();
document.getElementById('copy').onclick = () => navigator.clipboard.writeText(pick.value);
