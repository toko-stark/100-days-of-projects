const MAP = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
function toRoman(n) {
  if (n < 1 || n > 3999) return '';
  let r = '';
  for (const [v, s] of MAP) while (n >= v) { r += s; n -= v; }
  return r;
}
function fromRoman(s) {
  s = s.toUpperCase();
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const v = MAP.find(([,sym]) => sym[0] === s[i])?.[0] || 0;
    const next = MAP.find(([,sym]) => sym[0] === s[i+1])?.[0] || 0;
    n += v < next ? -v : v;
  }
  return n;
}
const num = document.getElementById('num'), rom = document.getElementById('rom');
num.oninput = () => rom.value = toRoman(+num.value);
rom.oninput = () => num.value = fromRoman(rom.value) || '';
