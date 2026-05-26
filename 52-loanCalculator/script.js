const fmt = n => '$' + n.toLocaleString(undefined, { maximumFractionDigits: 2 });
function calc() {
  const P = +amt.value, r = +rate.value / 100 / 12, n = +yrs.value * 12;
  const M = r === 0 ? P / n : P * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1);
  document.getElementById('m').textContent = fmt(M);
  document.getElementById('t').textContent = fmt(M * n);
  document.getElementById('i').textContent = fmt(M * n - P);
}
document.querySelectorAll('input').forEach(i => i.oninput = calc);
calc();
