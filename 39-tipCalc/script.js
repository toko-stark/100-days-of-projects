const calc = () => {
  const b = +bill.value || 0, t = +tip.value || 0, p = +ppl.value || 1;
  const ti = b * t / 100, to = b + ti;
  rt.textContent = '$' + ti.toFixed(2);
  rg.textContent = '$' + to.toFixed(2);
  rp.textContent = '$' + (to / p).toFixed(2);
};
document.querySelectorAll('input').forEach(i => i.oninput = calc);
calc();
